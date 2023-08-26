import AdminDashboard from "@/components/admin-nav";
import { InviteCodeDataTable } from "@/components/invite-codes/data-table";

export default function Resources() {
  return (
    <AdminDashboard>
      <InviteCodeDataTable />
    </AdminDashboard>
  );
}
