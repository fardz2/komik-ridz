import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
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
      </div>
    </nav>
  );
}
