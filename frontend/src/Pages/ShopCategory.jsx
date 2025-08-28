import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';

import Item from '../components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [sortOption, setSortOption] = useState('default');
  const [visibleProducts, setVisibleProducts] = useState(12);

  const filteredProducts = all_product.filter((item) => item.category === props.category);

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === 'priceLowToHigh') {
      return a.new_price - b.new_price;
    } else if (sortOption === 'priceHighToLow') {
      return b.new_price - a.new_price;
    } else {
      return 0; // No sorting applied
    }
  });

  const handleLoadMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 12);
  };

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{Math.min(visibleProducts, filteredProducts.length)}</span> out of {filteredProducts.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by   
          <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
            <option value="default">Default</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
          
        </div>
      </div>
      <div className="shopcategory-products">
        {sortedProducts.slice(0, visibleProducts).map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
      {visibleProducts < filteredProducts.length && (
        <div className="shopcategory-loadmore" onClick={handleLoadMore}>
          Explore More
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
