import React from "react";
import NavBar from "./_components/layouts/nav-bar";
interface ChapterLayoutProps {
  children: React.ReactNode;
}
export default function MainLayout({ children }: ChapterLayoutProps) {
  return (
    <>
      <NavBar />
      <div className="mt-10">{children}</div>
    </>
  );
}
