// app/daftar-komik/_components/ui/komik-list.tsx

import CardKomik from "@/app/(main)/_components/ui/card-komik";
import { getDaftarKomik } from "@/services/komik.service";

// Terima filters sebagai props
export async function KomikList({ filters }: { filters: any }) {
  // Lakukan fetching DI DALAM komponen ini
  const daftarKomik = await getDaftarKomik(filters);

  return (
    <>
      {daftarKomik.data.map((komik) => (
        <CardKomik
          key={komik.slug}
          title={komik.title}
          slug={komik.slug}
          image={komik.image}
          type={komik.type}
          chapter={komik.chapter}
          rating={komik.rating}
        />
      ))}
    </>
  );
}
