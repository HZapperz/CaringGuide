"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  query: string;
  onDelete?: () => void;
  onCreate?: () => void;
  setQuery: (s: string) => void;
}

export function DataTableToolbar<TData>({
  table,
  query,
  onCreate,
  setQuery,
  onDelete,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const hasSelections = Object.keys(table.getState().rowSelection).length > 0;

  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex flex-1 items-center space-x-2">
        {hasSelections && (
          <>
            <Button
              variant="ghost"
              onClick={() => table.resetRowSelection()}
              className="h-8 px-2 lg:px-3"
            >
              Clear Selection
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
            <Button className="h-8 px-2 lg:px-3" onClick={onDelete}>
              Delete
            </Button>
          </>
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex justify-center space-x-2">
        <Input
          placeholder="Search"
          value={query}
          className="h-8 w-[150px] lg:w-[250px]"
          onChange={(event) => setQuery(event.target.value)}
        />
        <Button className="h-8 px-2 lg:px-3" onClick={onCreate}>
          Create
        </Button>
      </div>
    </div>
  );
}
