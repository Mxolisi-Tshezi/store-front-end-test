// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import "./styles.css";

// export default function Categories() {
//   return (
//     <div className="categories-section">
//         <h1>Categories</h1>
//         <ul className="categories-list">
//             <li>TV, Audio & Media <img src="/arrow-greater-than.svg" /> </li>
//             <li>Laptops <img src="/arrow-greater-than.svg" /> </li>
//             <li>Computers <img src="/arrow-greater-than.svg" /> </li>
//             <li>Drones <img src="/arrow-greater-than.svg" /> </li>
//             <li>Wearables <img src="/arrow-greater-than.svg" /> </li>
//             <li>Cameras <img src="/arrow-greater-than.svg" /> </li>
//             <li>Sound <img src="/arrow-greater-than.svg" /> </li>
//             <li>Cellphones <img src="/arrow-greater-than.svg" /> </li>
//         </ul>
//     </div>
//   );
// }


"use client";

import "./styles.css";

export default function Categories({ categories }) {
  return (
    <div className="categories-section">
      <h1>Categories</h1>

      {categories.length === 0 ? (
        <p className="no-available">Not Available.</p>
      ) : (
        <ul className="categories-list">
          {categories.map((category) => (
            <li key={category.id}>
              {category.name} <img src="/arrow-greater-than.svg" alt="Arrow" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
