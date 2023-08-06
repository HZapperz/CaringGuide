import AdminDashboard from "@/components/admin-nav";
import { ResourcesDataTable } from "@/components/resources/data-table";

export default function Resources() {
  return (
    <AdminDashboard>
      <ResourcesDataTable />
    </AdminDashboard>
  );
}
