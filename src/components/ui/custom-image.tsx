import Image from "next/image";

interface CustomImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function CustomImage({ src, alt, className }: CustomImageProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}
