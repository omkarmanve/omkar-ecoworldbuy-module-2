import React, { useState } from 'react';
import products from '../data/products.json';
import ProductCard from './ProductCard';
import SidebarFilter from './SidebarFilter';

const ProductGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter(product => product.category === selectedCategory);

  return (
    <div className="product-page">
      <SidebarFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="grid">
        {filteredProducts.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
