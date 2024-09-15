// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState, useEffect } from "react";
// import "./SnackerProduct.css"; // Importing the CSS file
// import ModalPopup from "../../components/ModalPopup";

// const SneakerProductCarousel = ({ products }: ProductProps) => {
//   // State to track the current product index
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Get the current product based on the currentIndex
//   const currentProduct = products[currentIndex];

//   // State to track selected size and color
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [selectedColor, setSelectedColor] = useState<any>(null);
//   const [mainImage, setMainImage] = useState("");

//   // Load the default main image from the first color when component mounts
//   useEffect(() => {
//     setSelectedColor(currentProduct.colors[0]); // Default to the first color
//     setMainImage(currentProduct.colors[0].images[0]); // Default to the first image of the first color
//   }, [currentProduct]);

//   // Function to go to the next product
//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length); // Loop back to first when reaching the end
//     setSelectedSize(null); // Reset size selection when product changes
//   };

//   // Function to go to the previous product
//   const handlePrev = () => {
//     setCurrentIndex(
//       (prevIndex) => (prevIndex - 1 + products.length) % products.length
//     ); // Loop back to last when reaching the beginning
//     setSelectedSize(null); // Reset size selection when product changes
//   };
//   const handlePaginationDots = (index: number) => {
//     setCurrentIndex(index)
//   }
//   // Function to handle size selection
//   const handleSizeClick = (size: any) => {
//     setSelectedSize(size);
//   };

//   // Function to handle color selection
//   const handleColorClick = (color: any) => {
//     setSelectedColor(color);
//     setMainImage(color.images[0]); // Load the first image of the selected color
//   };

//   // Function to handle thumbnail click to load the main image
//   const handleThumbnailClick = (image: any) => {
//     setMainImage(image); // Load the clicked image as the main image
//   };

//   return (
//     <div className="product__container">
//       {/* Navbar */}
//       <div className="navbar">
//         <h1 className="logo">kalli</h1>
//         <button className="back-btn">Back</button>
//       </div>

//       {/* Product Section */}
//       <div className="product-section">
//         {/* First Div - Description */}
//         <div className="left-column">
//           <p className="brand">{currentProduct.category}</p>
//           <h2 className="product-title">{currentProduct.title}</h2>
//           <p className="product-description">{currentProduct.description}</p>
//           <div className="thumbnails">
//             {selectedColor?.images.map((image: any, index: any) => (
//               <img
//                 key={index}
//                 className="thumbnail"
//                 src={image}
//                 alt={`thumbnail ${index + 1}`}
//                 onClick={() => handleThumbnailClick(image)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Second Div - Main Image */}
//         <div className="main-image-column">
//           <img className="main-image" src={mainImage} alt={currentProduct.title} />
//           {/* Thumbnails */}

//         </div>

//         {/* Third Div - Size, Color, Reviews */}
//         <div className="details-column">
//           {/* Size Options */}
//           <div className="size-section">
//             <p className="size-label">Size</p>
//             <div className="sizes">
//               {/* {currentProduct.size.map((size) => (
//                 <button
//                   key={size}
//                   className={`size-btn ${selectedSize === size ? "selected" : ""}`}
//                   onClick={() => handleSizeClick(size)}
//                 >
//                   {size}
//                 </button>
//               ))} */}
//               {[37, 38, 39, 40, 41, 42].map((size) => (
//                 <button
//                   key={size}
//                   className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
//                   onClick={() => handleSizeClick(size)}
//                   disabled={!currentProduct.size.includes(size)} // Disable button if size does not exist
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Color Options */}
//           <div className="color-section">
//             <p className="color-label">Color</p>
//             <div className="colors">
//               {currentProduct.colors.map((color) => (
//                 <div
//                   key={color.name}
//                   className={`color ${selectedColor?.name === color.name ? "selected" : ""}`}
//                   style={{ backgroundColor: color.hex }}
//                   onClick={() => handleColorClick(color)}
//                 ></div>
//               ))}
//             </div>
//           </div>

//           {/* Reviews */}
//           <div className="reviews-section">
//             <p>Reviews: {currentProduct.rate}★</p>
//           </div>

//           {/* Price */}
//           <p className="price">Price: <span>${currentProduct.price}</span></p>

//           {/* Add to Cart Button */}
//           <button className="add-to-cart">Add to Cart</button>
//         </div>
//       </div>

//       {/* Footer - Navigation */}
//       <div className="footer">
//         <ModalPopup videoUrl={currentProduct.video || ""} />
//         <div className="">
//           <button className="nav-btn" onClick={handlePrev}>
//             ← 
//           </button>
//           {/* <div className="pagination">
//             <span>{currentIndex + 1}</span>/<span>{products.length}</span>
//           </div> */}
//           <button className="nav-btn" onClick={handleNext}>
//             →
//           </button>

//         </div>
//         <div className="paginations flex gap-[12px]">
//           {products.length ? products.map((product, index)=> <button onClick={()=> handlePaginationDots(index)} key={product.id} className={`pagination-dots ${currentIndex === index ? "active" : ""}`}></button>) : ""}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SneakerProductCarousel;
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Importing Framer Motion
import "./SnackerProduct.css"; // Importing the CSS file
import ModalPopup from "../../components/ModalPopup";
import { FaShoppingCart, FaArrowLeft, FaArrowRight, FaHeart, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Importing the cart icon

const SneakerProductCarousel = ({ products }: ProductProps) => {
  // State to track the current product index
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cartItems, setCartItems] = useState<any[]>([]); // State to track cart items

  // Get the current product based on the currentIndex
  const currentProduct = products[currentIndex];

  // State to track selected size and color
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [mainImage, setMainImage] = useState("");
  const [wishlistItems, setWishlistItems] = useState<any[]>([]); // State to track wishlist items

  // Load the default main image from the first color when component mounts
  useEffect(() => {
    setSelectedColor(currentProduct.colors[0]); // Default to the first color
    setMainImage(currentProduct.colors[0].images[0]); // Default to the first image of the first color
    setSelectedSize(currentProduct.size[0] || null); // Default to the first size if available
  }, [currentProduct]);

  // Function to go to the next product
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length); // Loop back to first when reaching the end
    setSelectedSize(null); // Reset size selection when product changes
  };

  // Function to go to the previous product
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    ); // Loop back to last when reaching the beginning
    setSelectedSize(null); // Reset size selection when product changes
  };

  const handlePaginationDots = (index: number) => {
    setCurrentIndex(index);
  };

  // Function to handle size selection
  const handleSizeClick = (size: number) => {
    setSelectedSize(size);
  };

  // Function to handle color selection
  const handleColorClick = (color: any) => {
    setSelectedColor(color);
    setMainImage(color.images[0]); // Load the first image of the selected color
  };

  // Function to handle thumbnail click to load the main image
  const handleThumbnailClick = (image: any) => {
    setMainImage(image); // Load the clicked image as the main image
  };
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating); // Full stars
    const hasHalfStar = rating % 1 >= 0.5; // Check if there's a half star
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Calculate remaining empty stars
  
    const stars = [];
  
    // Push full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} />);
    }
  
    // Push half star if applicable
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" />);
    }
  
    // Push empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} />);
    }
  
    return stars;
  };
  // Function to add selected product to cart
  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      const itemToAdd = {
        product: currentProduct.title,
        size: selectedSize,
        color: selectedColor.name,
        image: mainImage,
        price: currentProduct.price,
      };
          // Update the cart state
    setCartItems((prevItems) => {
      const updatedCart = [...prevItems, itemToAdd];

      // Store the updated cart in localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
      // setCartItems((prevItems) => [...prevItems, itemToAdd]);
    } else {
      // Default case (can add alert or message to select both)
      alert("Please select both size and color.");
    }
  };
  // Load cart and wishlist from localStorage on component mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const storedWishlistItems = JSON.parse(localStorage.getItem("wishlistItems") || "[]");

    setCartItems(storedCartItems);
    setWishlistItems(storedWishlistItems);
  }, []);
  // Save cart to localStorage when cartItems change
    // Function to add/remove product from wishlist
    const handleToggleWishlist = () => {
      const isInWishlist = wishlistItems.some(
        (item) => item.product === currentProduct.title
      );
    
      // If the item is already in the wishlist, remove it
      if (isInWishlist) {
        setWishlistItems((prevItems) => {
          const updatedWishlist = prevItems.filter(
            (item) => item.product !== currentProduct.title
          );
    
          // Store the updated wishlist in localStorage
          localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
          return updatedWishlist;
        });
      } else {
        // If the item is not in the wishlist, add it
        const itemToAdd = {
          product: currentProduct.title,
          size: selectedSize || currentProduct.size[0], // Default size if none selected
          color: selectedColor?.name || currentProduct.colors[0].name, // Default color if none selected
          image: mainImage,
          price: currentProduct.price,
        };
    
        setWishlistItems((prevItems) => {
          const updatedWishlist = [...prevItems, itemToAdd];
    
          // Store the updated wishlist in localStorage
          localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
          return updatedWishlist;
        });
      }
    };
  
    // Check if the current product is in the wishlist
    const isInWishlist = wishlistItems.some(
      (item) => item.product === currentProduct.title
    );
  return (
    <div className="product__container">
      <div className="navbar">
        <h1 className="logo">kalli</h1>
        <button className="back-btn" onClick={handlePrev}>Back</button>
        <div className="cart-icon">
          <FaShoppingCart size={24} />
          {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
        </div>
      </div>

      <div className="product-section">
        <div className="left-column">
          <p className="brand">{currentProduct.category}</p>
          <h2 className="product-title">{currentProduct.title}</h2>
          <p className="product-description">{currentProduct.description}</p>
          
          {/* Thumbnails with animation */}
          <motion.div className="thumbnails" layout>
            {selectedColor?.images.map((image: any, index: any) => (
              <motion.img
                key={index}
                className={`thumbnail ${mainImage === image ? "selected" : ""}`}
                src={image}
                alt={`thumbnail ${index + 1}`}
                onClick={() => handleThumbnailClick(image)}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </motion.div>
        </div>

        <div className="main-image-column">
          {/* Main Image Animation */}
          <motion.img
            className="main-image"
            src={mainImage}
            alt={currentProduct.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={mainImage} // Ensure it re-renders with animation when the main image changes
          />
        </div>

        <div className="details-column">
          <div className="size-section">
            <p className="size-label">Size</p>
            <motion.div className="sizes" layout>
              {[37, 38, 39, 40, 41, 42].map((size) => (
                <motion.button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                  onClick={() => handleSizeClick(size)}
                  disabled={!currentProduct.size.includes(size)}
                  whileTap={{ scale: 0.95 }}
                >
                  {size}
                </motion.button>
              ))}
            </motion.div>
          </div>

          <div className="color-section">
            <p className="color-label">Color</p>
            <motion.div className="colors" layout>
              {currentProduct.colors.map((color) => (
                <motion.div
                  key={color.name}
                  className={`color ${selectedColor?.name === color.name ? "selected" : ""}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => handleColorClick(color)}
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </motion.div>
          </div>

          <div className="reviews-section flex justify-between items-center">
        <p>Reviews:</p>
        <div className="stars flex items-center gap-[8px]">
          {renderStars(currentProduct.rate)}
        </div>
      </div>

          <p className="price flex justify-between items-center ">
            Price: <span>${currentProduct.price}</span>
          </p>
        </div>
      </div>

      <div className="footer">
        <ModalPopup videoUrl={currentProduct.video || ""} />
        <div className="footer-item">
          <div className="flex gap-[12px]">
            <button className="nav-btn" onClick={handlePrev}>
              <FaArrowLeft size={24} />
            </button>
            <button className="nav-btn" onClick={handleNext}>
              <FaArrowRight size={24} />
            </button>
          </div>
          <div className="paginations flex gap-[12px]">
            {products.length
              ? products.map((product, index) => (
                  <button
                    onClick={() => handlePaginationDots(index)}
                    key={product.id}
                    className={`pagination-dots ${currentIndex === index ? "active" : ""}`}
                  ></button>
                ))
              : ""}
          </div>
        </div>
        <div className="footer-item">
          <motion.button className="add-to-cart" onClick={handleAddToCart} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Add to Cart
          </motion.button>
          <div className="wishlist-icon" onClick={handleToggleWishlist}>
            <FaHeart size={24} color={isInWishlist ? "red" : "black"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SneakerProductCarousel;
