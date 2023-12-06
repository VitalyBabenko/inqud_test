import { Category } from '@/types/category';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';

interface CategoriesProps {
  filterPosts: () => void;
  allCategories: Category[];
  setAllCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  selectedCategories: Category[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const Categories: React.FC<CategoriesProps> = ({
  filterPosts,
  allCategories,
  setAllCategories,
  selectedCategories,
  setSelectedCategories,
}) => {
  const [filterPostsFlag, setFilterPostsFlag] = useState(false);

  const addToSelected = (category: Category) => {
    setSelectedCategories([...selectedCategories, category]);
    const filteredCategories = allCategories.filter((item) => item.id !== category.id);
    setAllCategories(filteredCategories);
    setFilterPostsFlag(true);
  };

  const removeFromSelected = (category: Category) => {
    setAllCategories((prevAllCategories) => [...prevAllCategories, category]);

    setSelectedCategories((prevSelectedCategories) => {
      const filteredCategories = prevSelectedCategories.filter((item) => item.id !== category.id);
      return filteredCategories;
    });

    setFilterPostsFlag(true);
  };

  useEffect(() => {
    if (filterPostsFlag) {
      filterPosts();
      setFilterPostsFlag(false);
    }
  }, [filterPostsFlag]);

  return (
    <div className={styles.categories}>
      <ul className={styles.selected}>
        {selectedCategories.length ? null : <li className={styles.category}>ALL</li>}
        {selectedCategories.map((category) => (
          <li
            onClick={() => removeFromSelected(category)}
            key={category.name}
            className={styles.category}
          >
            {category.name}
          </li>
        ))}
      </ul>
      <ul className={styles.allCategories}>
        {allCategories.map((category) => (
          <li onClick={() => addToSelected(category)} key={category.id}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
