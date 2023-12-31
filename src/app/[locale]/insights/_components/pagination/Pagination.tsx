'use client';

import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

const ArrowSvg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48" fill="none">
      <path
        opacity="0.6"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.7859 8.01099C24.7985 7.02359 23.1976 7.02359 22.2102 8.01099L11.4831 18.7381C10.4957 19.7255 10.4957 21.3264 11.4831 22.3138C12.4705 23.3012 14.0714 23.3012 15.0588 22.3138L25.7859 11.5867C26.7733 10.5993 26.7733 8.99839 25.7859 8.01099ZM25.7883 40.1907C26.7757 39.2033 26.7757 37.6024 25.7883 36.615L15.0613 25.8879C14.0739 24.9005 12.473 24.9005 11.4856 25.8879C10.4982 26.8753 10.4982 28.4762 11.4856 29.4636L22.2126 40.1907C23.2 41.1781 24.8009 41.1781 25.7883 40.1907ZM36.8661 21.5696C38.2625 21.5696 39.3945 22.7016 39.3945 24.098C39.3945 25.4944 38.2625 26.6264 36.8661 26.6264L21.6958 26.6264C20.2994 26.6264 19.1674 25.4944 19.1674 24.098C19.1674 22.7016 20.2994 21.5696 21.6958 21.5696L36.8661 21.5696Z"
        fill="#517185"
      />
    </svg>
  );
};

interface PaginationProps {
  filterPosts: () => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  allPostsCount: number;
}

export const POSTS_PER_PAGE = 6;

const Pagination = ({
  filterPosts,
  currentPage,
  setCurrentPage,
  allPostsCount,
}: PaginationProps) => {
  const [paginationFlag, setPaginationFlag] = useState<boolean>(false);
  const pages = Math.ceil(allPostsCount / POSTS_PER_PAGE);
  const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    setPaginationFlag(true);
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, pages));
    setPaginationFlag(true);
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    setPaginationFlag(true);
  };

  useEffect(() => {
    if (paginationFlag) {
      filterPosts();
      setPaginationFlag(false);
    }
  }, [paginationFlag]);

  if (pageNumbers.length < 2) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <button onClick={handlePrevClick} className={styles.prev} disabled={currentPage === 1}>
        <ArrowSvg />
      </button>
      <ul>
        {pageNumbers.map((page) => (
          <li
            className={page === currentPage ? styles.active : ''}
            onClick={() => handlePageClick(page)}
            key={page}
          >
            {page}
          </li>
        ))}
      </ul>
      <button onClick={handleNextClick} className={styles.next} disabled={currentPage === pages}>
        <ArrowSvg />
      </button>
    </div>
  );
};

export default Pagination;
