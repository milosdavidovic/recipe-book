import React, { ChangeEvent, useMemo, useState } from "react";
import client from "../../../client";
import groq from "groq";
import Layout from "../../components/Layout";
import SearchInput from "../../components/SearchInput/SearchInput";
import { useInfiniteQuery } from "@tanstack/react-query";
import RecipeCard from "@/components/RecipeCard";
import InfiniteScroll from "@/components/InfiniteScroll";
import styles from "./posts.module.scss";

const PAGE_SIZE = 8;

const sanityQuery = groq`{
  "items": *[_type == "post" && title match $query] | order(_id) [$from...$to] {
    "slug": slug.current,
    title,
    mainImage,
    "authorName": author->name
  },
  "total": count(*[_type == "post" && title match $query]) 
}`;

const reducePages = (pages: PostsQueryResult[] | undefined) => {
  return pages?.reduce((acc, curr) => {
    const result = { ...acc };
    result.items = [...(acc.items || []), ...curr.items];

    return result;
  }, {} as PostsQueryResult);
};

interface PostsQueryResult {
  items: {
    slug: string;
    title: string;
    mainImage: any;
    authorName: string;
  }[];
  total: number;
}

const Posts = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["posts", searchQuery],
    {
      queryFn: ({ pageParam: pageOffset = 0 }) =>
        client.fetch<PostsQueryResult>(sanityQuery, {
          query: `**${searchQuery}**`,
          from: pageOffset,
          to: pageOffset + PAGE_SIZE,
        }),

      getNextPageParam: (lastPage, pages) =>
        reducePages(pages)?.items.length === lastPage.total
          ? undefined
          : reducePages(pages)?.items.length,
    }
  );

  const items = useMemo(() => reducePages(data?.pages)?.items || [], [data]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleEnter = () => {
    setSearchQuery(searchValue);
  };

  return (
    <Layout>
      <h1 className={styles.headline}>Welcome to Ultimate Chef Recipe Book</h1>

      <SearchInput
        value={searchValue}
        placeholder="Search for recipes..."
        onChange={handleSearchChange}
        onSearch={handleEnter}
      />
      <InfiniteScroll
        isLoading={isFetching}
        onLoadMore={() => {
          if (!data || !items) return;

          if (hasNextPage) {
            fetchNextPage();
          }
        }}
      >
        <div className={styles["posts-container"]}>
          {(items || []).map((item) => (
            <RecipeCard
              key={item.title}
              author={item.authorName}
              image={item.mainImage}
              title={item.title}
              link={`/posts/${item.slug}`}
            />
          ))}
        </div>
      </InfiniteScroll>
    </Layout>
  );
};

export default Posts;
