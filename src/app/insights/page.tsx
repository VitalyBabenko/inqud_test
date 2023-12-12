'use client';

import Breadcrumb from '@/_components/breadcrumb';
import React, { FormEvent, useEffect, useState } from 'react';
import HeadingSection from './_components/headingSection';
import Posts from './_components/posts';
import { Post } from '@/types/post';
import axios from 'axios';
import Pagination from './_components/pagination';
import { POSTS_PER_PAGE } from './_components/pagination/Pagination';
import { Tag } from '@/types/tag';
import Tags from './_components/tags';

const Insights = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allPostsCount, setAllPostsCount] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      const postsResp = await axios.get('/api/posts');
      setPosts(postsResp.data.posts);
      setAllPostsCount(postsResp.data.postsCount);

      const tagsResp = await axios.get('/api/tags');
      setAllTags(tagsResp.data);
    };
    getData();
  }, []);

  const filterPosts = async (event: FormEvent | null = null) => {
    if (event) {
      event.preventDefault();
    }
    const { data } = await axios.get('/api/posts', {
      params: {
        search: inputValue,
        tags: selectedTags.map((tag) => tag.id),
        first: POSTS_PER_PAGE,
        skip: (currentPage - 1) * POSTS_PER_PAGE,
      },
    });

    if (data.posts.length < 6) {
      setAllPostsCount(data.posts.length);
    } else {
      setAllPostsCount(data.postsCount);
    }
    setPosts(data.posts);
  };

  return (
    <main>
      <Breadcrumb />
      <HeadingSection
        filterPosts={filterPosts}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <Tags
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
