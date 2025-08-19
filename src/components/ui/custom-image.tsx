import Image from "next/image";

interface CustomImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function CustomImage({ src, alt, className }: CustomImageProps) {
  // Jika src kosong, render div dengan background abu-abu
  if (!src) {
    return (
      <div className={`relative overflow-hidden bg-gray-200 ${className}`} />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}
