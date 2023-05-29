import React from "react";
import classes from "./Chip.module.scss";

interface Props {
  text: string;
}

const Chip = ({ text }: Props) => {
  return (
    <div className={classes.chip}>
      <span>{text}</span>
    </div>
  );
};

export default Chip;
