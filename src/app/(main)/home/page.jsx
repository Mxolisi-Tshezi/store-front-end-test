"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import Categories from "@/components/categories/Categories";
import Filter from "@/components/filter-sidebar/Filter";
import ProductCard from "@/components/product-card/ProductCard"
import "./styles.css";

import productdata from "../../../lib/productdata.json";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedFilters, setSelectedFilters] = useState({
    brands: [],
    availability: [],
    colors: [],
    minPrice:  0, 
    maxPrice: 0,
  });
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Construct query params dynamically based on selectedFilters
        const params = new URLSearchParams();

        if (selectedFilters.brands.length > 0) {
          params.append("brandName", selectedFilters.brands.join(",")); // Multiple brands
        }
        if (selectedFilters.colors.length > 0) {
          params.append("color", selectedFilters.colors.join(","));
        }
        if (selectedFilters.availability.length > 0) {
          params.append("inStock", selectedFilters.availability.includes("inStock"));
        }
        if (selectedFilters.minPrice) {
          params.append("minPrice", selectedFilters.minPrice);
        }
        if (selectedFilters.maxPrice) {
          params.append("maxPrice", selectedFilters.maxPrice);
        }

        const url = `https://vxzro3ib15.execute-api.eu-north-1.amazonaws.com/v1/product/get-all?${params.toString()}`;

        console.log("Fetching Products from:", url); // Debugging

        const response = await axios.get(url);

        console.log("API Response:", response.data); // Debugging

        if (response.data && Array.isArray(response.data.productList)) {
          setProducts(response.data.productList);
        } else {
          console.error("Invalid product data format:", response.data);
          setProducts([]);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedFilters]);



  const [categories, setCategories] = useState([]);
  const [catloading, setCatLoading] = useState(true);
  const [caterror, setCatError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://vxzro3ib15.execute-api.eu-north-1.amazonaws.com/v1/category/get-all"
        );
        setCategories(response.data.categoryList || []);
      } catch (err) {
        setCatError("Failed to fetch categories.");
      } finally {
        setCatLoading(false);
      }
    };

    fetchCategories();
  }, []);


  const [filterOptions, setFilterOptions] = useState(null);
  const [filterloading, setFilterLoading] = useState(true);
  const [filtererror, setFilterError] = useState(null);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await axios.get(
          "https://vxzro3ib15.execute-api.eu-north-1.amazonaws.com/v1/product/filter-options"
        );
        setFilterOptions(response.data.filterOptions);
      } catch (err) {
        setFilterError("Failed to fetch filter options.");
      } finally {
        setFilterLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  


  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev };

      if (filterType === "brands" || filterType === "colors" || filterType === "availability") {
        updatedFilters[filterType] = prev[filterType].includes(value)
          ? prev[filterType].filter((item) => item !== value) // Remove if exists
          : [...prev[filterType], value]; // Add if not exists
      } else {
        updatedFilters[filterType] = value;
      }

      console.log("Updated Filters:", updatedFilters); // Debugging
      return updatedFilters;
    });
  };





  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="max-width">
          <div className="hero-content">
            <div>
              <p className="hero-tagline">Buy a new <br /><span>device and insure
                it instantly</span></p>
              <button className="main-btn">Shop Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Hot Product Display */}
      <section className="max-width hot-product-section">
        <div className="hot-item add-margin">
          <h3>HD <span>CAMERAS</span> DEALS</h3>
          <div className="hot-item-inner-section">
            <button>Shop... <img src="/next-page.svg" /> </button>
            <img src="/hot-product-01.png" />
          </div>
        </div>

        <div className="hot-item">
          <h3>SHOP  <span>THE HOTTEST</span> WEARABLES</h3>
          <div className="hot-item-inner-section">
            <button>Shop... <img src="/next-page.svg" /> </button>
            <img src="/hot-product-02.png" />
          </div>
        </div>

        <div className="hot-item">
          <h3>AIRPODS <span>SALE</span> LIMITED TIME!</h3>
          <div className="hot-item-inner-section negitive-margin">
            <button>Shop... <img src="/next-page.svg" /> </button>
            <img src="/hot-product-03.png" />
          </div>
        </div>

        <div className="hot-item add-margin">
          <h3>MACBOOK <span>PRO</span> DEALS</h3>
          <div className="hot-item-inner-section ">
            <button>Shop... <img src="/next-page.svg" /> </button>
            <img src="/hot-product-04.png" />
          </div>
        </div>
      </section>

      {/* Body Parts */}
      <section className="max-width products-sections">
        <div>
          {catloading && <p>Loading categories...</p>}
          {caterror && <p className="error">{error}</p>}
          {!catloading && !caterror && <Categories categories={categories} />}
          <br />
          {filterloading && <p>Loading filter options...</p>}
          {filtererror && <p className="error">{error}</p>}
          {!filterloading && !filtererror && filterOptions && (
            // <Filter
            //   brands={filterOptions.brands}
            //   availability={filterOptions.availability}
            //   priceRange={filterOptions.priceRange}
            //   colors={filterOptions.colors}
            // />
            <Filter
              brands={filterOptions.brands}
              availability={filterOptions.availability}
              priceRange={filterOptions.priceRange}
              colors={filterOptions.colors}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
          )}
        </div>

        <div>
          <img src="/banner-home.png" className="home-banner" />

          {/* Brand */}
          <div className="title-btn">
            <h1>Shop by Brands</h1>
            <button className="main-btn">View All</button>
          </div>
          <img src="/brand-images.jpg" className="home-banner" />

          {/* New Arrival */}
          <div className="title-btn">
            <h1>New Arrival</h1>
            <button className="main-btn">View All</button>
          </div>

          {/* Display Products  */}
          {/* <div className="product-container">
            {productdata.map((product, index) => (
              <ProductCard
                key={index}
                brandName={product.brandName}
                productName={product.productName}
                productImage={product.productImage}
                productPrice={product.productPrice}
              />
            ))}
          </div> */}
          <div className="product-container">

            {loading && <p>Loading products...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && products.length === 0 && <p>No products available.</p>}
            {!loading && !error && (
              <>
                {/* <p>Products Available: {products.length}</p> */}
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    brandName={product.brand?.name}
                    productName={product.description}
                    productImage={product.imageUrl}
                    productPrice={`R${product.price}`}
                  />
                ))}
              </>
            )}

          </div>

        </div>


      </section>

      {/* Trending Product Section  */}
      <section className="max-width">

        <div className="title-btn">
          <h1>Trending This Week</h1>
          <button className="main-btn">View All</button>
        </div>
        <hr className="custom-line-orange" />

        {/* Display Products  */}
        <div className="trending-product-container">
          {productdata.slice(0, 5).map((product, index) => (
            <ProductCard
              key={index}
              brandName={product.brandName}
              productName={product.productName}
              productImage={product.productImage}
              productPrice={product.productPrice}
            />
          ))}
        </div>
      </section>

      {/* Two Banner  */}
      <section className="max-width banner-section">
        <div className="banner-leftside">
          <div>
            <h1 className="banner-heading">Wearables</h1>
            <button className="shop-btn">Shop Now</button>
          </div>
          <img src="/banner1.png" className="banner1-img" />
        </div>

        <div className="banner-rightside">
          <div>
            <h1 className="banner-heading">Smart <br />Accessories</h1>
            <button className="shop-btn">Shop Now</button>
          </div>
          <img src="/banner2.png" className="banner2-img" />
        </div>
      </section>

      {/* Shippign Section */}
      <section className="max-width shipping-section">

        <div className="shipping-item">
          <img src="/FreeShipping.png" />
          <div>
            <p className="shipping-subheading">On orders over R2000</p>
            <p className="shipping-heading"> Free Shipping</p>
          </div>
        </div>

        <div className="shipping-item">
          <img src="/Checkout.png" />
          <div>
            <p className="shipping-subheading">100% Secure Payment</p>
            <p className="shipping-heading">Secure Checkout</p>
          </div>
        </div>

        <div className="shipping-item">
          <img src="/OnlineSupport.png" />
          <div>
            <p className="shipping-subheading">Ensure product quality</p>
            <p className="shipping-heading"> Online Support</p>
          </div>
        </div>

      </section>

      <section className="max-width callnow-section">
        <img src="/callnow.png" />
        <div>
          <h1>YOU NEED HELP?</h1>
          <p>Feel free to reach out to our specialists, they'll gladly assist you in selecting the right products.</p>
        </div>

      </section>

    </>
  );
}
