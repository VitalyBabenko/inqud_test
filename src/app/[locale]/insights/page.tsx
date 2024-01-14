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
import Loading from './loading';
import { InsightsPageContent } from '@/types/insightsPage';

const Insights = ({ params: { locale } }: any) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allPostsCount, setAllPostsCount] = useState<number>(0);
  const [pageContent, setPageContent] = useState<InsightsPageContent>();

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.post('/api/insights', { locale });
      setPageContent(data.pageContent);
      setAllTags(data.tags);
      setPosts(data.posts);
      setAllPostsCount(data.postsCount);
    };

    getData();
  }, []);

  const filterPosts = async (search: string | null = inputValue) => {
    const tags = selectedTags.map((tag) => tag.id);
    const first = POSTS_PER_PAGE;
    let skip = (currentPage - 1) * POSTS_PER_PAGE;

    if (inputValue && tags) {
      skip = 0;
      setCurrentPage(1);
    }

    const { data } = await axios.post('/api/insights', {
      locale,
      search,
      tags,
      first,
      skip,
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
      <Posts
        posts={posts}
        emptyPostsText={pageContent.emptyPostsText}
        timeToReadText={pageContent.timeToReadText}
      />
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
