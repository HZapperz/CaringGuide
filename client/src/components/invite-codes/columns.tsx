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
import { InviteCode } from "@prisma/client";
import { intlFormat } from "date-fns";

type Props = {
  onDelete: (d: InviteCode) => void;
  onCopy: (d: InviteCode) => void;
};

export function getColumns({
  onDelete,
  onCopy,
}: Props): ColumnDef<InviteCode>[] {
  const columns: ColumnDef<InviteCode>[] = [
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
      enableSorting: false,
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Code" />
      ),
      cell: ({ row }) => <div>{row.getValue("code")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) => {
        const createdAtObject = new Date(row.getValue("createdAt"));
        const createdAt = intlFormat(createdAtObject, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          year: "numeric",
          month: "short",
          day: "2-digit",
        });

        return <div>{createdAt}</div>;
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
              <DotsHorizontalIcon className="w-4 h-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem onClick={() => onDelete(row.original)}>
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onCopy(row.original)}>
              Copy
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return columns;
}
