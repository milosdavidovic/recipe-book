import React, { PropsWithChildren, useEffect, useRef } from "react";
import styles from "./InfiniteScroll.module.scss";

interface Props {
  isLoading?: boolean;
  onLoadMore: () => void;
}

const InfiniteScroll: React.FC<PropsWithChildren<Props>> = ({
  isLoading,
  onLoadMore,
  children,
}) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [onLoadMore]);

  return (
    <div className={styles.InfiniteScroll}>
      {isLoading && <div className={styles.loadingIndicator}>Loading...</div>}
      <div className={styles.content}>{children}</div>
      <div ref={observerTarget} />
    </div>
  );
};

export default InfiniteScroll;
