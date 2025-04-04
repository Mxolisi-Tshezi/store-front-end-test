"use client";
import "./styles.css";
import { useState } from "react";

export default function Filter({ brands, availability, priceRange, colors, selectedFilters, onFilterChange }) {
  const [value, setValue] = useState(0);


  const [minValue, setMinValue] = useState(priceRange?.min || 0);
  const [maxValue, setMaxValue] = useState(priceRange?.max || 100);

  // Handle Min Price Change
  const handleMinChange = (event) => {
    let value = parseFloat(event.target.value);
    if (value < maxValue) {
      setMinValue(value);
      onFilterChange({ ...selectedFilters, minPrice: value });
    }
  };

  // Handle Max Price Change
  const handleMaxChange = (event) => {
    let value = parseFloat(event.target.value);
    if (value > minValue) {
      setMaxValue(value);
      onFilterChange({ ...selectedFilters, maxPrice: value });
    }
  };

  return (
    <div className="filter-sidebar-section">
      <h1 className="filter-title">Filter</h1>
      <hr className="custom-line-orange" />

      {/* Brands */}
      <div className="filter-child">
        <div className="filter-heading">
          <h2>Brands</h2>
          <img src="/arrow-down.svg" />
        </div>

        {brands.length === 0 ? (
          <p>No brands available.</p>
        ) : (
          brands.map((brand) => (
            <label key={brand.name} className="input-wrapper">
              <input type="checkbox" />
              <span>
                {brand.name}
              </span>
            </label>
          ))
        )}
      </div>

      <hr className="custom-line-orange" />

      {/* Availability */}
      <div className="filter-child">
        <div className="filter-heading">
          <h2>Availability</h2>
          <img src="/arrow-down.svg" />
        </div>

        <label className="input-wrapper">
          <input type="checkbox" />
          <span>In Stock ({availability?.inStock || 0})</span>
        </label>

        <label className="input-wrapper">
          <input type="checkbox" />
          <span>Out of Stock ({availability?.outOfStock || 0})</span>
        </label>
      </div>

      <hr className="custom-line-orange" />

      {/* Colors */}
      <div className="filter-child">
        <div className="filter-heading">
          <h2>Colors</h2>
          <img src="/arrow-down.svg" />
        </div>

        {colors.length === 0 ? (
          <p>No colors available.</p>
        ) : (
          colors.map((color) => (
            <label key={color.name} className="input-wrapper">
              <input type="checkbox" />
              <span>
                {color.name}
              </span>
            </label>
          ))
        )}
      </div>

      <hr className="custom-line-orange" />

      {/* Price */}
      {/* Price Range Slider */}
      <div className="filter-child">
        <div className="filter-heading">
          <h2>Price</h2>
          <img src="/arrow-down.svg" />
        </div>
        <div className="slider-container">
          {/* Track background */}
          <div className="slider-track"></div>

          {/* Min Price Slider */}
          <input
            type="range"
            min={priceRange?.min || 0}
            max={priceRange?.max || 100}
            value={minValue}
            onChange={handleMinChange}
            className="slider"
          />

          {/* Max Price Slider */}
          <input
            type="range"
            min={priceRange?.min || 0}
            max={priceRange?.max || 100}
            value={maxValue}
            onChange={handleMaxChange}
            className="slider"
          />
        </div>


        {/* Price Values */}
        <div className="price-values">
          <span>Min: {minValue}</span>
          <span>Max: {maxValue}</span>
        </div>
      </div>
    </div>
  );
}

