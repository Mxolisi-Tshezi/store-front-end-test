"use client";
import Link from "next/link";
import Image from "next/image";
import "./styles.css";

export default function ProductCard({ brandName, productName, productImage, productPrice }) {
  return (
    <div className="product-card">
      <img src="/favorite.svg" className="favorite" />
      <div className="meta-data">
        <p className="brand-name">{brandName}</p>
        <h1 className="product-name">{productName}</h1>
        <img src={productImage} className="product-img"/>
        <p className="product-price">{productPrice}</p>
        <button className="main-btn">Add To Cart</button>
      </div>

    </div>
  );
}
