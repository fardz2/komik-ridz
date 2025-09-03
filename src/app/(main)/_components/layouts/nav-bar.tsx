import Container from "@/components/layouts/container";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b transition-transform duration-300">
      <Container className=" flex justify-between items-center">
        <div className="text-lg font-bold">KomikRidz</div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/daftar-komik" className="hover:underline">
              Daftar Komik
            </Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
}
