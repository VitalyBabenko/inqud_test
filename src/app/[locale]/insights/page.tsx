'use client';

import Breadcrumb from '@/_components/breadcrumb';
import React, { useEffect, useState } from 'react';
import HeadingSection from './_components/headingSection';
import Posts from './_components/posts';
import { Post } from '@/types/post';
import axios from 'axios';
import Pagination from './_components/pagination';
import { POSTS_PER_PAGE } from './_components/pagination/Pagination';
import { Tag } from '@/types/tag';
import Tags from './_components/tags';
import { useLocale } from 'next-intl';
import Loading from './loading';

export interface PageContent {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  searchButtonText: string;
  allTagsButtonText: string;
}

const Insights = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allPostsCount, setAllPostsCount] = useState<number>(0);
  const [pageContent, setPageContent] = useState<PageContent>();
  const locale = useLocale();

  useEffect(() => {
    const getData = async () => {
      const postsResp = await axios.get('/api/posts', {
        params: {
          locale,
        },
      });
      setPosts(postsResp.data.posts);
      setAllPostsCount(postsResp.data.postsCount);

      const tagsResp = await axios.get(`/api/tags`, {
        params: {
          locale,
        },
      });
      setAllTags(tagsResp.data);

      const pageContentResp = await axios.get('/api/insights', {
        params: {
          locale,
        },
      });
      setPageContent(pageContentResp.data);
    };
    getData();
  }, []);

  const filterPosts = async (search: string | null = inputValue) => {
    const tags = selectedTags.map((tag) => tag.id);
    const first = POSTS_PER_PAGE;
    let skip = (currentPage - 1) * POSTS_PER_PAGE;

    if (inputValue) {
      skip = 0;
      setCurrentPage(1);
    }

    const { data } = await axios.get('/api/posts', {
      params: { locale, search, tags, first, skip },
    });

    setAllPostsCount(data.postsCount);
    setPosts(data.posts);
  };

  if (!pageContent) {
    return <Loading />;
  }

  return (
    <main>
      <Breadcrumb />
      <HeadingSection
        pageContent={pageContent}
        filterPosts={filterPosts}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <Tags
        allTagsButtonText={pageContent.allTagsButtonText}
        filterPosts={filterPosts}
        allTags={allTags}
        setAllTags={setAllTags}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      <Posts posts={posts} />
      <Pagination
        filterPosts={filterPosts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        allPostsCount={allPostsCount}
      />
    </main>
  );
};

export default Insights;
