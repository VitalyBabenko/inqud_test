import { Category } from '@/types/category';
import styles from './styles.module.scss';

interface CategoriesProps {
  allCategories: Category[];
}

const Categories = async ({ allCategories }: CategoriesProps) => {
  return (
    <div className={styles.categories}>
      <ul className={styles.selected}>
        <li className={styles.category}>ALL</li>
        {/* {selectedCategories.map((category) => (
          <li key={category.tag} className={styles.category}>
            {category.tag}
          </li>
        ))} */}
      </ul>
      <ul className={styles.allCategories}>
        {allCategories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
