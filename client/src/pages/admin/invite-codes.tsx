import AdminDashboard from "@/components/admin-nav";
import { InviteCodeDataTable } from "@/components/mentor-codes/data-table";
import { ResourcesDataTable } from "@/components/resources/data-table";

export default function Resources() {
  return (
    <AdminDashboard>
      <InviteCodeDataTable />
    </AdminDashboard>
  );
}
