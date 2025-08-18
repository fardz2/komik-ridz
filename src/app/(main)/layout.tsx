import Container from "@/components/layouts/container";
import NavBar from "./_components/layouts/nav-bar";
interface ChapterLayoutProps {
  children: React.ReactNode;
}
export default function MainLayout({ children }: ChapterLayoutProps) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
