/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import { ImgHTMLAttributes } from "react";

type MegiwaImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "width" | "height" | "alt"
> & {
  mediaIdentifier: string | undefined;
  placeholder?: string;
  alt?: string | null | undefined;
} & (
    | {
        scaleToFill?: true;
        width: number;
        height: number;
      }
    | {
        scaleToFill: false;
      }
  );

export default function MegiwaImage({
  mediaIdentifier,
  placeholder = "/placeholder.png",
  alt,
  ...props
}: MegiwaImageProps) {
  return (
    <Image src={mediaIdentifier || placeholder} alt={alt || ""} {...props} />
  );
}
