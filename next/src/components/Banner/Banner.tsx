import React from "react";
import styles from "./Banner.module.scss";
import Link from "next/link";

const Banner = () => {
  return (
    <div className={styles.Banner}>
      <span className={styles.badge}>Today&#39;s wisdom</span>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          Good food is very often, even most often, simple food
        </div>
        <div className={styles.subtitle}>
          &Prime;Food is everything we are. It&#39;s an extension of nationalist
          feeling, ethnic feeling, your personal history, your province, your
          region, your tribe, your grandma. It&#39;s inseparable from those from
          the get-go.&Prime; -{" "}
          <span style={{ fontStyle: "normal" }}>Anthony Bourdain</span>
        </div>
        <Link href={"/posts"}>
          <div className={styles.callToAction}>
            Explore The Recipes <i className="fas fa-arrow-right"></i>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
