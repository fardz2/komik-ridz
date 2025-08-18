import CardKomikSkeleton from "../ui/card-skeleton";

export default function KomikSkeleton() {
  return (
    <div className="flex flex-wrap gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <CardKomikSkeleton key={i} />
      ))}
    </div>
  );
}
