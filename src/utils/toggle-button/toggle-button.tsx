import classnames from "classnames";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import styles from "./toggle-button.module.scss";

interface ToggleInputProps {
  title?: string;
  sub_title?: string;
  isRequired?: boolean;
  disabled?: "disabled_checked" | "disabled_not_checked" | null;
  registration?: Partial<UseFormRegisterReturn>;
  className?: string;
  icon?: React.ReactNode;
}

export const ToggleButton: React.FC<ToggleInputProps> = ({
  title,
  sub_title,
  disabled,
  registration,
  className = "",
  icon,
}) => {
  const classes = classnames(styles.custom_toggle, {
    [className]: className,
    [styles.disabled_checked]: disabled === "disabled_checked",
    [styles.disabled_not_checked]: disabled === "disabled_not_checked",
  });
  return (
    <label className={styles.base}>
      <input
        type="checkbox"
        disabled={Boolean(disabled)}
        className={styles.input}
        {...registration}
      />
      <div className={classes}>
        <div className={styles.text}>
          <span>{sub_title}&nbsp;</span>
          <span>{title}</span>
        </div>
        <div className={styles.circle}>{icon}</div>
      </div>
    </label>
  );
};
