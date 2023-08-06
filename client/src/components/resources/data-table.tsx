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
import AccountForm, { AccountFormValues as ResourcesFormValues } from "./form";
import Page from "../page";
import { DataTable } from "@/components/data-table/data-table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Resources } from "@prisma/client";

const Content: {
  [key: string]: {
    title: string;
    description: string;
  };
} = {
  create: {
    title: "Create resource",
    description: "Create a new resoruce.",
  },
  edit: {
    title: "Edit resource",
    description: "Edit an existing resource.",
  },
};

export function ResourcesDataTable() {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(25);

  const [selected, setSelected] = React.useState<Resources>();
  const [mode, setMode] = React.useState<
    "view" | "edit" | "delete" | "create" | "bulk_delete"
  >("view");
  const [query, setQuery] = React.useState("");

  const fetchResources = useQuery(
    ["resources", query, pageIndex, pageSize],
    () => {
      return {
        items: [] as Resources[],
        pageCount: 1,
      };
    }
  );

  const deleteResources = useMutation(async (ids: Resources["id"][]) => {
    // asasas

    return true;
  }, {});

  const createMutation = useMutation(async (data: Omit<Resources, "id">) => {
    // asasas

    return true;
  }, {});

  const updateMutation = useMutation(async (data: Resources) => {
    // asasas

    return true;
  }, {});

  const handleFormSubmit = async (data: ResourcesFormValues) => {
    if (mode === "create") {
      await createMutation.mutateAsync(data);
    } else if (mode === "edit" && selected) {
      await updateMutation.mutateAsync({
        id: selected.id,
        data,
      });
    }

    clearSelection();
  };

  const handleEdit = (resource: Resources) => {
    setSelected(resource);
    setMode("edit");
  };

  const handleDelete = (resource: Resources) => {
    setSelected(resource);
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
    data: fetchResources.data?.items ?? [],
    columns,
    state: {
      rowSelection,
      pagination: {
        pageSize,
        pageIndex,
      },
    },
    enableRowSelection: true,
    manualPagination: true,
    pageCount: fetchResources.data?.pageCount ?? 0,
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
      onDelete={() => setMode("bulk_delete")}
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
      title="Resources"
      isLoading={fetchResources.isInitialLoading}
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
              selected resources(s).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deleteResources.mutate(
                  mode === "delete" && !!selected
                    ? [selected.id]
                    : table.getSelectedRowModel().rows.map((r) => r.id)
                )
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
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{Content[mode]?.title}</SheetTitle>
            <SheetDescription>{Content[mode]?.description}</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <AccountForm
              isSubmitting={
                updateMutation?.isLoading || createMutation?.isLoading
              }
              onSubmit={handleFormSubmit}
              defaultValues={selected}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Page>
  );
}
