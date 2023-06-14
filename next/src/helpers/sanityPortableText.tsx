import client from "../../client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function urlFor(source: any): any {
  return builder.image(source);
}

export const ptComponents = () => ({
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          alt={value.alt || " "}
          loading="lazy"
          src={urlFor(value).width(320).height(240).fit("max").auto("format")}
        />
      );
    },
  },
});
