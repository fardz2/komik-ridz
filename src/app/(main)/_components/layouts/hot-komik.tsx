import { getHotKomik } from "@/services/komik.service";
import CardKomik from "../ui/card-komik";

export default async function HotKomik() {
  const hotKomik = await getHotKomik();
  return (
    <>
      {hotKomik.data.map((komik) => (
        <CardKomik key={komik.slug} {...komik} />
      ))}
    </>
  );
}
