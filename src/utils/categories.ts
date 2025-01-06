import { CategoriesMap, Category } from "../types/categories";

interface GeneratedCategories {
    categoriesMap: CategoriesMap;
    rootCategories: Category[]; // Top-level categories with parentId: null
}

export const generateCategoriesMap = (categories: Category[]): GeneratedCategories => {
    const categoriesMap: CategoriesMap = {};
    const rootCategories: Category[] = []; // Collect top-level categories

    // Initialize each category in the map
    categories.forEach((category) => {
        categoriesMap[category.id] = { ...category, children: [] };

        // If the category has no parent, add it to rootCategories
        if (category.parentId === null) {
            rootCategories.push(categoriesMap[category.id]);
        }
    });

    // Build the tree structure
    categories.forEach((category) => {
        const { id, parentId } = category;

        if (parentId === null) {
            // Skip assigning a parent for top-level categories
            return;
        }

        // Add this category as a child to its parent if the parent exists
        if (categoriesMap[parentId]) {
            categoriesMap[parentId].children.push(categoriesMap[id]);
        }
    });

    return { categoriesMap, rootCategories };
};