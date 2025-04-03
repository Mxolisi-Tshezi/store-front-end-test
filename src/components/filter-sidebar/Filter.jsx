"use client";
import Link from "next/link";
import Image from "next/image";
import "./styles.css";
import { useState } from "react";

export default function Filter() {
  const [value, setValue] = useState(0);

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1);

  const handleMinChange = (event) => {
    const value = parseFloat(event.target.value);
    if (value < maxValue) {
      setMinValue(value);
    }
  };

  const handleMaxChange = (event) => {
    const value = parseFloat(event.target.value);
    if (value > minValue) {
      setMaxValue(value);
    }
  };
  return (
    <div className="filter-sidebar-section">
      <h1 className="filter-title">Filter</h1>
      <hr className="custom-line-orange" />

      {/* Brand Name */}
      <div className="filter-child">
        <div className="filter-heading">
          <h2>Brands</h2>
          <img src="/arrow-down.svg" />
        </div>

        <label className="input-wrapper">
          <input
            type="checkbox"
          />
          <span>Apple</span>
        </label>

        <label className="input-wrapper">
          <input
            type="checkbox"
          />
          <span>Sumsung</span>
        </label>

        <label className="input-wrapper">
          <input
            type="checkbox"
          />
          <span>Appo</span>
        </label>

        <label className="input-wrapper">
          <input
            type="checkbox"
          />
          <span>Huawei</span>
        </label>

        <label className="input-wrapper">
          <input
            type="checkbox"
          />
          <span>Toshiba</span>
        </label>

        <label className="input-wrapper">
          <input
            type="checkbox"
          />
          <span>Sony</span>
        </label>

        <label className="input-wrapper">
          <input
            type="checkbox"
          />
          <span>Dell</span>
        </label>

        <label className="input-wrapper">
          <input
            type="checkbox"
          />
          <span>Denon</span>
        </label>

        <label className="input-wrapper">
          <input
            type="checkbox"
          />
          <span>HP</span>
        </label>


      </div>

      <hr className="custom-line-orange" />


      {/* Availability */}
      <div className="filter-child">
        <div className="filter-heading">
          <h2>Availability</h2>
          <img src="/arrow-down.svg" />
        </div>

        <label className="input-wrapper">
          <input
            type="checkbox"
          />
          <span>In Stock (9)</span>
        </label>

        <label className="input-wrapper">
          <input
            type="checkbox"
          />
          <span>Out of Stock (3)</span>
        </label>


      </div>

      <hr className="custom-line-orange" />

      {/* Colours */}
      <div className="filter-child">
        <div className="filter-heading">
          <h2>Colours</h2>
          <img src="/arrow-down.svg" />
        </div>

        <label className="input-wrapper">
          <input
            type="checkbox"
          />
          <span>Black</span>
        </label>

        <label className="input-wrapper">
          <input
            type="checkbox"
          />
          <span>White</span>
        </label>

        <label className="input-wrapper">
          <input
            type="checkbox"
          />
          <span>Gray</span>
        </label>

        <label className="input-wrapper">
          <input
            type="checkbox"
          />
          <span>Pink</span>
        </label>

        <label className="input-wrapper">
          <input
            type="checkbox"
          />
          <span>Red</span>
        </label>
      </div>

      <hr className="custom-line-orange" />

      {/* Colours */}
      <div className="filter-child">
        <div className="filter-heading">
          <h2>Price</h2>
          <img src="/arrow-down.svg" />
        </div>

        <div className="slider-container">
          <div className="tooltip" style={{ left: `calc(${value}% - 12px)` }}>
            {value}
            <div className="tooltip-arrow"></div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="slider"
          />

          <div className="slider-knob" style={{ left: `calc(${value}% - 0px)` }} />
        </div>
      </div>


    </div>
  );
}
