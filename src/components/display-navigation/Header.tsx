"use client";
import Link from "next/link";
import Image from "next/image";
import "./header.css";

export default function Header() {
  return (
    <header>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="max-width">
          <div className="icons">
            <Link href="/auth/login" className="icons-text">
              <img src="/account.svg" /> <span>Login / Register</span> 
            </Link>
            <Link href="/wishlist" className="icons-text">
              <img src="/heart.svg" /> <span>Wishlist</span> 
            </Link>
            <Link href="/cart" className="icons-text">
              <img src="/shopping-cart.svg" /> <span>Cart</span> 
            </Link>
          </div>
        </div>
      </div>


      {/* Main Header */}
      <div className="max-width">

      <div className="main-header">
        <div className="logo">
          <Link href="/">
            <Image src="/logo.svg" alt="Sumer Store" width={150} height={50} />
          </Link>
        </div>

        <nav className="menu">
          <ul>
            <li><Link href="#">SHOP</Link></li>
            <li><Link href="#">PRODUCTS</Link></li>
            <li><Link href="#">BRANDS</Link></li>
            <li><Link href="#">SALE</Link></li>
            <li><Link href="#">CONTACT US</Link></li>
          </ul>
        </nav>

        <div className="search">
          <input type="text" placeholder="Searching..." />
        </div>
      </div>
      </div>
    </header>
  );
}
