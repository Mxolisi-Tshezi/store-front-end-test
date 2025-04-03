"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "./styles.css";

const menuItems = [
  { name: "Categories", path: "/admin/categories", icon: "/admin-menu/categories.svg" },
  { name: "Products", path: "/admin/products", icon: "/admin-menu/product.svg" },
  { name: "Orders", path: "/admin/orders", icon: "/admin-menu/order.svg" },
  { name: "Settings", path: "/admin/settings", icon: "/admin-menu/settings.svg" },
  { name: "Logout", path: "/admin/logout", icon: "/admin-menu/logout.svg" },
];

export default function AdminSidebar() {
  const pathname = usePathname(); // Get current route

  return (
    <div className="menu-section">
      <div className="logo">
        <img src="/logo.svg" />
      </div>
      <ul className="menu-list">
        {menuItems.map((item) => (
          <li key={item.path} className={pathname === item.path ? "active" : ""}>
            <Link href={item.path}>
              <div>
                <img src={item.icon} />
                {item.name}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
