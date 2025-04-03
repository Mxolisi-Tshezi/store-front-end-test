import AdminSidebar from "@/components/admin-sidebar/AdminSidebar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";
import "./styles.css"

export default function AdminMainLayout({ children }) {
  return (
    <div >
      <div className="admin-layout max-width">
        {/* Sidebar */}
        <AdminSidebar />
        <main className="main-content">{children}</main>
      </div>

      <Footer />


      <Toaster richColors position="top-right" />
    </div>
  );
}
