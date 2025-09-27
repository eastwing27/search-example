import { FC } from "react";

import styles from "./searchComponents.module.css"

interface FoundItemProps {
  name: string;
  color: string;
  material: string;
  category: string;
}

export const FoundItem : FC<FoundItemProps> = ({
  name, color, material, category
}) => {
  return (<div className={styles.foundItem}>
    <h3>{name}</h3>
    <div className={styles.tagList}>
      <div className={styles.tag}>{color}</div>
      <div className={styles.tag}>{material}</div>
      <div className={styles.tag}>{category}</div>
    </div>
  </div>)
};
