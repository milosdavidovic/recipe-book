import React from "react";
import Image from "next/image";
import { ImageModel } from "@/types/sanity";
import { sanityImageBuilder } from "@/helpers/sanityImageBuilder";

const SanityImage = ({
  image,
  width,
  height,
  rounded = false,
}: {
  image: ImageModel;
  width: number;
  height: number;
  rounded: boolean;
}) => {
  return (
    <Image
      alt="image"
      src={sanityImageBuilder(image).width(width).url()}
      width={width}
      height={height}
      priority={true}
      style={{ borderRadius: rounded ? "100%" : undefined }}
    />
  );
};

export default SanityImage;
