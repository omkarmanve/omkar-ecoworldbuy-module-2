import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import SidebarFilter from './SidebarFilter';


const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/products.json')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not OK');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load product data.');
        setLoading(false);
      });
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const priceRanges = ['All', 'Below ₹200', '₹200–₹500', 'Above ₹500'];

  const filteredProducts = products.filter(product => {
    const matchCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchPrice =
      selectedPriceRange === 'All' ||
      (selectedPriceRange === 'Below ₹200' && product.price < 200) ||
      (selectedPriceRange === '₹200–₹500' && product.price >= 200 && product.price <= 500) ||
      (selectedPriceRange === 'Above ₹500' && product.price > 500);

    return matchCategory && matchPrice;
  });

  if (loading) {
    return (
      <div className="loader" aria-busy="true">
        <div className="spinner" /> Loading products...
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!loading && !error && filteredProducts.length === 0) {
    return <div className="no-results">No products match your filters.</div>;
  }

  return (
    <div className="product-page" aria-busy={loading}>
      <SidebarFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRanges={priceRanges}
        selectedPriceRange={selectedPriceRange}
        setSelectedPriceRange={setSelectedPriceRange}
        disabled={loading || error}
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
