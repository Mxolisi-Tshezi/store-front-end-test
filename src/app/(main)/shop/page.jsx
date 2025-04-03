"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Categories from "@/components/categories/Categories";
import Filter from "@/components/filter-sidebar/Filter";
import ProductCard from "@/components/product-card/ProductCard"
import "./styles.css";

import productdata from "../../../lib/productdata.json";

export default function HomePage() {
  return (
    <>

      <div className="max-width">
        <div className="tabNavigation ">
          <p>Home </p>
          <img src="/greater-then-icon.svg" />
          <p>Shop</p>
        </div>
      </div>


      {/* Body Parts */}
      <section className="max-width products-sections">
        <div>
          <Categories />
          <br />
          <Filter />
        </div>

        <div>

          {/* New Arrival */}
          <div className="title-btn">
            <h1>Cellphones</h1>
          </div>

          {/* Display Products  */}
          <div className="product-container">
            {productdata.map((product, index) => (
              <ProductCard
                key={index}
                brandName={product.brandName}
                productName={product.productName}
                productImage={product.productImage}
                productPrice={product.productPrice}
              />
            ))}
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

    </>
  );
}
