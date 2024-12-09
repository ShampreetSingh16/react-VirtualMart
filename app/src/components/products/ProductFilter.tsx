import { useMemo, useState } from 'react';
import productType from './ProductType';

const ProductFilter = (products: productType[]) => {
  //State to store selected brands for filtering
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  //State to store the selected category for filtering
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  //State to store the search term for filtering by product name
  const [searchTerm, setSearchTerm] = useState<string>('');
  //State to store the sort order (asc or desc)
  const [sortedBy, setSortedBy] = useState('');
  //function to check if a product matches the selected brand
  const matchesBrand = (product: productType) => {
    return !selectedBrand.length || selectedBrand.includes(product.brand);
  };
  //function to check if a product matches the selected category
  const matchesCategory = (product: productType) => {
    return !selectedCategory || product.category === selectedCategory;
  };
  //function to check if a product matches the search term filter
  const matchesSearch = (product: productType) => {
    return !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase());
  };
  // Memoized value to filter products based on selected brand, category, and search term
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    // Filter products by matching brand, category, and search term
    return products.filter((product) => {
      return matchesBrand(product) && matchesCategory(product) && matchesSearch(product);
    });
  }, [products, selectedBrand, selectedCategory, searchTerm]);
  // Memoized value to sort the filtered products by price based on the selected sort order
  const sortedProducts = useMemo(() => {
    if (!filteredProducts) return [];
    const sortedArray = [...filteredProducts];
    if (sortedBy === "asc") {
      // Sort products in ascending order by price
      sortedArray.sort((a, b) => a.price - b.price);
    } else if (sortedBy === "desc") {
      // Sort products in descending order by price
      sortedArray.sort((a, b) => b.price - a.price);
    }
    return sortedArray;
  }, [filteredProducts, sortedBy]);

  //function to update the selected brands filter
  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const brand = event.target.value;
    setSelectedBrand((prev) =>
      prev.includes(brand)
        ? prev.filter((item) => item !== brand) // Remove brand if already selected
        : [...prev, brand] // Add brand if not selected
    );
  };

  //function to update the selected category filter
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  //function to update the search term filter
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  //function to update the sort order
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortedBy(event.target.value);
  };

  //function to clear all filters and reset states
  const handleClearFilter = () => {
    setSelectedBrand([]);
    setSelectedCategory("");
    setSearchTerm("");
  };

  //Return all states and function for use in a component
  return {
    selectedBrand,
    selectedCategory,
    searchTerm,
    sortedBy,
    filteredProducts,
    sortedProducts,
    handleBrandChange,
    handleCategoryChange,
    handleSearchChange,
    handleClearFilter,
    handleSortChange,
  };
};

export default ProductFilter;
