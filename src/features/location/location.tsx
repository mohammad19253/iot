import React from "react";
import { Map } from "./map";
import styles from "./locations.module.scss";
export const Location = () => {
  return (
    <div className={styles.locations}>
      <Map />
    </div>
  );
};
