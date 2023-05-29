import imageUrlBuilder from "@sanity/image-url";
import client from "../../client";
import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";

export function sanityImageBuilder(source: string): ImageUrlBuilder {
  return imageUrlBuilder(client).image(source);
}
