import CardKomik from "@/app/(main)/_components/ui/card-komik";
import { KomikItem } from "@/types/komik.type";

interface ComicListProps {
  comics: KomikItem[];
}

export function ComicList({ comics }: ComicListProps) {
  if (comics.length === 0) {
    return (
      <p role="alert" aria-live="polite">
        No comics found.
      </p>
    );
  }
  return (
    <>
      {comics.map((komik) => (
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
