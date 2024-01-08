import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { Tag } from '@/types/tag';

interface TagsProps {
  allTagsButtonText: string;
  filterPosts: () => void;
  allTags: Tag[];
  setAllTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  selectedTags: Tag[];
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

const Tags: React.FC<TagsProps> = ({
  allTagsButtonText,
  filterPosts,
  allTags,
  setAllTags,
  selectedTags,
  setSelectedTags,
}) => {
  const [filterPostsFlag, setFilterPostsFlag] = useState(false);

  const addToSelected = (category: Tag) => {
    setSelectedTags([...selectedTags, category]);
    const filteredTags = allTags.filter((item) => item.id !== category.id);
    setAllTags(filteredTags);
    setFilterPostsFlag(true);
  };

  const removeFromSelected = (tag: Tag) => {
    setAllTags((prevAllTags) => [...prevAllTags, tag]);

    setSelectedTags((prevSelectedTags) => {
      const filteredTags = prevSelectedTags.filter((item) => item.id !== tag.id);
      return filteredTags;
    });

    setFilterPostsFlag(true);
  };

  useEffect(() => {
    if (filterPostsFlag) {
      filterPosts();
      setFilterPostsFlag(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterPostsFlag]);

  return (
    <div className={styles.tags}>
      <ul className={styles.selected}>
        {selectedTags.length ? null : <li className={styles.category}>{allTagsButtonText}</li>}
        {selectedTags.map((tag) => (
          <li onClick={() => removeFromSelected(tag)} key={tag.name} className={styles.category}>
            {tag.name}
          </li>
        ))}
      </ul>
      <ul className={styles.allTags}>
        {allTags.map((tag) => (
          <li onClick={() => addToSelected(tag)} key={tag.id}>
            {tag.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
