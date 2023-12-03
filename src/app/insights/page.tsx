import Breadcrumb from '@/_components/breadcrumb';
import React from 'react';
import HeadingSection from './_components/headingSection';
import Categories from './_components/categories';
import Posts from './_components/posts';
import getAllCategories from '@/service/getAllCategories';
import { Category } from '@/types/category';
import getPosts from '@/service/getPosts';

const Insights = async () => {
  const allCategories: Category[] = await getAllCategories();
  const posts = await getPosts();
  console.log(posts);

  return (
    <main>
      <Breadcrumb />
      <HeadingSection />
      <Categories allCategories={allCategories} />
      <Posts posts={posts} />
    </main>
  );
};

export default Insights;
