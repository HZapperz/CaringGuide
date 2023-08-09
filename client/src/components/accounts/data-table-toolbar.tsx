"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  query: string;
  onCreate?: () => void;
  setQuery: (s: string) => void;
}

export function DataTableToolbar<TData>({
  table,
  query,
  onCreate,
  setQuery,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between space-x-4">
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
