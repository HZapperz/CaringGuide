import AdminDashboard from "@/components/admin-nav";
import { AccountsDataTable } from "@/components/accounts/data-table";

export default function Accounts() {
  return (
    <AdminDashboard>
      <AccountsDataTable />
    </AdminDashboard>
  );
}
