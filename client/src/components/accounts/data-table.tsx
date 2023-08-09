import * as React from "react";
import {
  RowSelectionState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { getColumns } from "./columns";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
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
import AccountForm, { FormValues as AccountFormValues } from "./form";
import Page from "../page";
import { DataTable } from "@/components/data-table/data-table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Profile } from "@prisma/client";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ScrollArea } from "../ui/scroll-area";

const Content: {
  [key: string]: {
    title: string;
    description: string;
  };
} = {
  create: {
    title: "Create account",
    description: "Create a new account.",
  },
  edit: {
    title: "Edit account",
    description: "Edit an existing account.",
  },
};

export function AccountsDataTable() {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(25);

  const [selected, setSelected] = React.useState<Profile>();
  const [mode, setMode] = React.useState<"view" | "edit" | "delete" | "create">(
    "view"
  );

  const [query, setQuery] = React.useState("");

  const fetchAccounts = useQuery(
    ["resources", query, pageIndex, pageSize],
    async () => {
      const data: {
        items: Profile[];
        pageCount: number;
      } = (
        await axios.get("/api/admin/accounts", {
          params: {
            query: !!query ? query : undefined,
            skip: pageIndex * pageSize,
            take: pageSize,
          },
        })
      ).data;

      return data;
    }
  );

  const deleteAccount = useMutation(
    async (id: Profile["id"]) => {
      const data: {
        message: string;
        count: number;
      } = (await axios.delete(`/api/admin/resources/${id}`)).data;

      return data;
    },
    {
      onSuccess: (data) => {
        toast.success(data.message);
        fetchAccounts.refetch();
      },
      onError: () => {},
    }
  );

  const createMutation = useMutation(
    async (body: AccountFormValues) => {
      const data: {
        message: string;
      } = await axios.post("/api/admin/accounts", body);

      return data;
    },
    {
      onSuccess: (data) => {
        toast.success(data.message);
        fetchAccounts.refetch();
      },
      onError: () => {},
    }
  );

  const updateMutation = useMutation(
    async (
      body: AccountFormValues & {
        id: Profile["id"];
      }
    ) => {
      const data: {
        message: string;
      } = await axios.patch(`/api/admin/accounts/${selected?.id}`, body);

      return data;
    },
    {
      onSuccess: (data) => {
        toast.success(data.message);
        fetchAccounts.refetch();
      },
      onError: () => {},
    }
  );

  const handleFormSubmit = async (data: AccountFormValues) => {
    if (mode === "create") {
      await createMutation.mutateAsync(data);
    } else if (mode === "edit" && selected) {
      await updateMutation.mutateAsync({
        id: selected.id,
        ...data,
        password: data.password === "$$_pwd_$$" ? undefined : data.password,
      });
    }

    clearSelection();
  };

  const handleEdit = (account: Profile) => {
    setSelected(account);
    setMode("edit");
  };

  const handleDelete = (account: Profile) => {
    setSelected(account);
    setMode("delete");
  };

  const clearSelection = () => {
    setSelected(undefined);
    setRowSelection({});
    setMode("view");
  };

  const columns = React.useMemo(
    () =>
      getColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    []
  );

  const table = useReactTable({
    data: fetchAccounts.data?.items ?? [],
    columns,
    state: {
      rowSelection,
      pagination: {
        pageSize,
        pageIndex,
      },
    },
    getRowId: (row) => row.id,
    enableRowSelection: true,
    manualPagination: true,
    pageCount: fetchAccounts.data?.pageCount ?? 0,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const toolbar = (
    <DataTableToolbar
      table={table}
      onCreate={() => setMode("create")}
      query={query}
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
      title="Accounts"
      isLoading={fetchAccounts.isInitialLoading}
      toolbar={toolbar}
      footer={footer}
    >
      <DataTable table={table} />
      <AlertDialog
        open={mode === "delete"}
        onOpenChange={(open) => {
          if (!open) clearSelection();
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected resources(s).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                mode === "delete" &&
                !!selected &&
                deleteAccount.mutate(selected.id)
              }
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Sheet
        open={mode === "create" || mode === "edit"}
        onOpenChange={(open) => !open && clearSelection()}
      >
        <SheetContent className="flex h-full w-full flex-col p-0 py-4">
          <SheetHeader className="px-4">
            <SheetTitle>{Content[mode]?.title}</SheetTitle>
            <SheetDescription>{Content[mode]?.description}</SheetDescription>
          </SheetHeader>
          <AccountForm
            isSubmitting={
              updateMutation?.isLoading || createMutation?.isLoading
            }
            onSubmit={handleFormSubmit}
            // @ts-ignore
            defaultValues={
              selected ?? {
                password: "$$_pwd_$$",
              }
            }
          />
        </SheetContent>
      </Sheet>
    </Page>
  );
}
