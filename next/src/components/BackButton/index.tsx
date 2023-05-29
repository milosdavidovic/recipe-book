import React, { ButtonHTMLAttributes } from "react";
import style from "./BackButton.module.scss";

const BackButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...props} className={style["back-button"]}>
      <i className="fas fa-arrow-left"></i>
    </button>
  );
};

export default BackButton;
