import { FoundItem } from "@/components/search/searchComponents";
import { NotixPage } from "@/components/shared/sharedComponents";
import { useDebounceCallback } from "@/hooks/useDebounce";
import { search } from "@/services/searchService";
import { ItemDTO } from "@/types/types";
import { useEffect, useState } from "react";

import styles from "../components/search/searchComponents.module.css"
import { useRouter } from "next/router";

export default function SearchPage () {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ searchString, setSearchString ] = useState("");
  const [ result, setResult ] = useState<ItemDTO[]>([]);

  const router = useRouter();

  const updateSearchString = useDebounceCallback((newVal: string) => setSearchString(newVal), 500);

  useEffect(() => {
    if (searchString.length < 3) {
      router.push({
          pathname: router.pathname,
          query: { }
        }, undefined, { shallow: true });
      setResult([]);
      return;
    };

    setIsLoading(true);

    search(searchString)
      .then(result => {
        setResult(result);
        router.push({
          pathname: router.pathname,
          query: { search: searchString }
        }, undefined, { shallow: true });
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [searchString]);

  return (
    <NotixPage>
      <input 
        className={styles.search}
        placeholder="Start typing..."
        onChange={e => updateSearchString(e.target.value)} />
      <div className={styles.foundItemList}>
        {!isLoading && result.map(item => 
          <FoundItem 
            key={item.name}
            {...item}
          />)}
      </div>
      {isLoading && (
          <div className={styles.spinner}/>
        )
      }
    </NotixPage>
  );
}