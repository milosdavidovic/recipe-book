import React from "react";
import { ImageModel } from "@/types/sanity";
import RatioImage from "../RatioImage/RatioImage";
import styles from "./Recipe.module.scss";
import Link from "next/link";

interface Props {
  title: string;
  image: ImageModel;
  author: string;
  width?: string;
  link?: string;
}

const ConditionalWrapper = ({ condition, wrapper, children }: any) =>
  condition ? wrapper(children) : children;

const RecipeCard: React.FC<Props> = ({ title, image, author, width, link }) => {
  return (
    <div className={styles.recipeCard} style={{ width: width || "100%" }}>
      <ConditionalWrapper
        condition={link}
        wrapper={(children: any) => (
          <Link href={link || ""} style={{ color: "#1d4e42" }}>
            {children}
          </Link>
        )}
      >
        <RatioImage image={image} />
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.author}>by {author}</div>
        </div>
      </ConditionalWrapper>
    </div>
  );
};

export default RecipeCard;
