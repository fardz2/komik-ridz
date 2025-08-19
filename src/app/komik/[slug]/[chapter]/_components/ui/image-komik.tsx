import Image from "next/image";

interface CustomImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function CustomImage({
  src,
  alt,
  className,
  width = 800, // default
  height = 1200, // default
}: CustomImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`w-full h-auto object-contain ${className}`}
    />
  );
}
