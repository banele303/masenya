"use client";

import dynamic from "next/dynamic";

const AdminLayoutContent = dynamic(() => import("./AdminLayoutContent"), {
  ssr: false,
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutContent>{children}</AdminLayoutContent>;
}

