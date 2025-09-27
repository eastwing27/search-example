import { FC, ReactNode } from "react";

import styles from "./sharedComponents.module.css"

interface Props {
  children: ReactNode[]|ReactNode;
}

export const NotixPage : FC<Props> = ({
  children
}) => {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )
};
