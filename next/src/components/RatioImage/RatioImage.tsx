import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import Image from "next/image";
import { ImageModel } from "@/types/sanity";
import { sanityImageBuilder } from "@/helpers/sanityImageBuilder";

const styles: Record<string, React.CSSProperties> = {
  imageContainer: {
    width: "100%" /* Adjust the desired width */,
    paddingBottom:
      "56.25%" /* Adjust the desired aspect ratio (e.g., 75% for 4:3) */,
    position: "relative",
    overflow: "hidden",
  },
  image: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

const RatioImage = ({ image }: { image: ImageModel }) => {
  return (
    <div style={styles.imageContainer}>
      <Image
        src={sanityImageBuilder(image).width(800).url()}
        alt="Image"
        fill
        style={{ objectFit: "cover" }}
        priority={true}
      />
    </div>
  );
};

export default RatioImage;
