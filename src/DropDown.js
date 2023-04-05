import { useState } from "react";
import {
  Collection,
  Card,
  Heading,
  Text,
  Grid,
  Button,
  useTheme,
} from '@aws-amplify/ui-react';

const CategoryDropdown = ({ notes }) => {
  const { tokens } = useTheme();
  const [categories, setCategories] = useState(["Category 1", "Category 2", "Category 3"]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleNewCategorySubmit = (event) => {
    event.preventDefault();
    const updatedCategories = [newCategory, ...categories];
    setCategories(updatedCategories);
    setSelectedCategory(newCategory);
    setNewCategory("");
  };

  const categoryItems = notes.filter(note => note.category === selectedCategory);

  return (
    <div>
      <form onSubmit={handleNewCategorySubmit}>
        <input
          type="text"
          value={newCategory}
          onChange={(event) => setNewCategory(event.target.value)}
          placeholder="New category"
        />
        <button type="submit">Add</button>
      </form>
      <Grid templateColumns={`repeat(${categories.length}, 1fr)`} gap="1rem">
        {categories.map((category, index) => (
          <Button
            key={index}
            onClick={() => setSelectedCategory(category)}
            variant={index}
            size="small"
          >
            {category}
          </Button>
        ))}
      </Grid>
      {selectedCategory && (
        <Grid templateColumns="repeat(3, 1fr)" gap="1rem">
          {categoryItems.map((item, index) => (
            <Card
              key={index}
            >
              <Heading level={4}>{item.name}</Heading>
              <Text>{item.description}</Text>
            </Card>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CategoryDropdown;
