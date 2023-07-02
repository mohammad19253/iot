import React from "react";
import Spinner from "react-bootstrap/Spinner";

import styles from "./button.module.scss";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  isDisable?: boolean;
  isLoading?: boolean;
  className?: string;
}
export const Button: React.FC<ButtonProps> = ({
  children = "",
  onClick,
  isDisable,
  isLoading,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisable}
      className={`${styles.primary_button} ${className}`}
    >
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        children
      )}
    </button>
  );
};
