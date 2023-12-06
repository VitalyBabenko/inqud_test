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

const Insights = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const getData = async () => {
      const postsResp = await axios.get('/api/posts');
      setPosts(postsResp.data);

      const categoriesResp = await axios.get('/api/categories');
      setAllCategories(categoriesResp.data);
    };
    getData();
  }, []);

  const filterPosts = async (event: FormEvent | null = null) => {
    if (event) {
      event.preventDefault();
    }
    const response = await axios.get('/api/posts', {
      params: {
        search: inputValue,
        categories: selectedCategories.map((cate) => cate.id),
      },
    });

    setPosts(response.data);
  };

  return (
    <main>
      <Breadcrumb />
      <HeadingSection
        inputValue={inputValue}
        setInputValue={setInputValue}
        filterPosts={filterPosts}
      />
      <Categories
        filterPosts={filterPosts}
        allCategories={allCategories}
        setAllCategories={setAllCategories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      <Posts posts={posts} />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </main>
  );
};

export default Insights;
