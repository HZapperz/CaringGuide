import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
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
import { Profile } from "@prisma/client";

type Props = {
  onEdit: (d: Profile) => void;
  onDelete: (d: Profile) => void;
};

export function getColumns({ onEdit, onDelete }: Props): ColumnDef<Profile>[] {
  const columns: ColumnDef<Profile>[] = [
    {
      accessorKey: "firstName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="FirstName" />
      ),
      cell: ({ row }) => <div>{row.getValue("firstName")}</div>,
      enableSorting: false,
    },
    {
      enableSorting: false,
      accessorKey: "lastName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="LastName" />
      ),
      cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
    },
    {
      enableSorting: false,
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="email" />
      ),
      cell: ({ row }) => <div>{row.getValue("email") as string}</div>,
    },
    {
      enableSorting: false,
      accessorKey: "phone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone" />
      ),
      cell: ({ row }) => <div>{row.getValue("phone")}</div>,
    },
    {
      enableSorting: false,
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      cell: ({ row }) => <div>{row.getValue("role")}</div>,
    },
    {
      enableSorting: false,
      accessorKey: "dob",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date of Birth" />
      ),
      cell: ({ row }) => (
        <div>{new Date(row.getValue("dob")).toDateString()}</div>
      ),
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
