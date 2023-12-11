'use client';

import Breadcrumb from '@/_components/breadcrumb';
import React, { FormEvent, useEffect, useState } from 'react';
import HeadingSection from './_components/headingSection';
import Categories from './_components/categories';
import Posts from './_components/posts';
import { Category } from '@/types/category';
import { Post } from '@/types/post';
import axios from 'axios';
import Pagination from './_components/pagination';
import { POSTS_PER_PAGE } from './_components/pagination/Pagination';

const Insights = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allPostsCount, setAllPostsCount] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      const postsResp = await axios.get('/api/posts');
      setPosts(postsResp.data.posts);
      setAllPostsCount(postsResp.data.postsCount);

      const categoriesResp = await axios.get('/api/categories');
      setAllCategories(categoriesResp.data);
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
        categories: selectedCategories.map((cate) => cate.id),
        first: POSTS_PER_PAGE,
        skip: (currentPage - 1) * POSTS_PER_PAGE,
      },
    });
    setAllPostsCount(data.postsCount);
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
      <Categories
        filterPosts={filterPosts}
        allCategories={allCategories}
        setAllCategories={setAllCategories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
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
