import {
  RowSelectionState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useHandleErrors from "@/hooks/useHandleErrors";
import { InviteCode } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import Page from "../page";
import { getColumns } from "./columns";
import { DataTableToolbar } from "./data-table-toolbar";

const short = require("short-uuid");

export function InviteCodeDataTable() {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(25);
  const handleErrors = useHandleErrors();

  const [selected, setSelected] = React.useState<InviteCode>();
  const [mode, setMode] = React.useState<"view" | "delete" | "bulk_delete">(
    "view"
  );
  const [query, setQuery] = React.useState("");

  const fetchCodes = useQuery(
    ["codes", query, pageIndex, pageSize],
    async () => {
      const data: {
        items: InviteCode[];
        pageCount: number;
      } = (
        await axios.get("/api/admin/invite-code", {
          params: {
            query: !!query ? query : undefined,
            skip: pageIndex * pageSize,
            take: pageSize,
          },
        })
      ).data;
      console.log(data);
      return data;
    }
  );

  const deleteCodesMutation = useMutation(
    async (codes: InviteCode["code"][]) => {
      console.log("DELETING", codes);
      const data: {
        message: string;
        count: number;
      } = (
        await axios.delete("/api/admin/invite-code", {
          data: {
            codes,
          },
        })
      ).data;

      return data;
    },
    {
      onSuccess: (data) => {
        toast.success("Invite Code(s) deleted.");
        fetchCodes.refetch();
      },
      onError: handleErrors,
    }
  );

  const createMutation = useMutation(
    async () => {
      const createdCode = short.generate();
      const data = await axios.post("/api/admin/invite-code", {
        code: createdCode,
      });

      console.log("created", data);

      return data;
    },
    {
      onSuccess: (data) => {
        navigator.clipboard.writeText(data.data.code);
        toast.success("Invite Code created and copied to clipboard.");
        fetchCodes.refetch();
      },
      onError: handleErrors,
    }
  );

  const handleDelete = (inviteCode: InviteCode) => {
    setSelected(inviteCode);
    setMode("delete");
  };

  const clearSelection = () => {
    setSelected(undefined);
    setRowSelection({});
    setMode("view");
  };

  const handleCopy = (code: InviteCode) => {
    navigator.clipboard.writeText(code.code);
    toast.success("Invite Code copied to clipboard.");
  };

  const columns = React.useMemo(
    () =>
      getColumns({
        onDelete: handleDelete,
        onCopy: handleCopy,
      }),
    []
  );

  const table = useReactTable({
    data: fetchCodes.data?.items ?? [],
    columns,
    state: {
      rowSelection,
      pagination: {
        pageSize,
        pageIndex,
      },
    },
    getRowId: (row) => row.code,
    enableRowSelection: true,
    manualPagination: true,
    pageCount: fetchCodes.data?.pageCount ?? 0,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const createNewCode = () => {
    createMutation.mutateAsync();
  };

  const toolbar = (
    <DataTableToolbar
      table={table}
      onCreate={createNewCode}
      query={query}
      onDelete={() => setMode("bulk_delete")}
      setQuery={setQuery}
    />
  );

  const footer = (
    <DataTablePagination
      table={table}
      setPageIndex={setPageIndex}
      setPageSize={setPageSize}
    />
  );

  return (
    <Page
      title="Invite Codes"
      isLoading={fetchCodes.isInitialLoading}
      toolbar={toolbar}
      footer={footer}
    >
      <DataTable table={table} />
      <AlertDialog
        open={mode === "delete" || mode === "bulk_delete"}
        onOpenChange={(open) => {
          if (!open) clearSelection();
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected invite codes(s).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deleteCodesMutation.mutate(
                  mode === "delete" && !!selected
                    ? [selected.code]
                    : table.getSelectedRowModel().rows.map((r) => r.id)
                )
              }
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Page>
  );
}
