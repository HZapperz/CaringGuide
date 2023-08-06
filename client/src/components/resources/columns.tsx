import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Resources } from "@prisma/client";

type Props = {
  onEdit: (d: Resources) => void;
  onDelete: (d: Resources) => void;
};

export function getColumns({
  onEdit,
  onDelete,
}: Props): ColumnDef<Resources>[] {
  const columns: ColumnDef<Resources>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "imgsrc",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Image" />
      ),
      cell: ({ row }) => <div>{row.getValue("image")}</div>,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => <div>{row.getValue("title")}</div>,
    },
    {
      accessorKey: "sub",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Sub title" />
      ),
      cell: ({ row }) => <div>{row.getValue("title")}</div>,
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ row }) => <div>{row.getValue("category")}</div>,
    },

    {
      accessorKey: "link",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Link" />
      ),
      cell: ({ row }) => {
        const isVerified = row.getValue("link");

        return (
          <Badge variant={isVerified ? "outline" : "secondary"}>
            {isVerified ? "Verified" : "Pending"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      enableSorting: false,
      meta: {
        align: "center",
      },
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
            >
              <DotsHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem onClick={() => onEdit(row.original)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(row.original)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return columns;
}
