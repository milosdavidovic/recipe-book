import { ImageModel } from "@/types/sanity";
import React from "react";
import SanityImage from "../SanityImage";
import styles from "./AboutAuthor.module.scss";

interface Props {
  name: string;
  description: string;
  image: ImageModel;
}

const AboutAuthor = ({ name, description, image }: Props) => {
  return (
    <div className={styles.aboutAuthor}>
      {image && <SanityImage width={100} height={100} image={image} rounded />}
      <div>
        <div className={styles.title}>{name}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

export default AboutAuthor;
