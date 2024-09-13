/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import "./SnackerProduct.css"; // Importing the CSS file
import ModalPopup from "../../components/ModalPopup";
// import image from './assets/images/1/red/1.jpg'

const SneakerProductCarousel = ({ products }: ProductProps) => {
  // State to track the current product index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get the current product based on the currentIndex
  const currentProduct = products[currentIndex];

  // State to track selected size and color
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [mainImage, setMainImage] = useState("");

  // Load the default main image from the first color when component mounts
  useEffect(() => {
    setSelectedColor(currentProduct.colors[0]); // Default to the first color
    setMainImage(currentProduct.colors[0].images[0]); // Default to the first image of the first color
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

  // Function to handle size selection
  const handleSizeClick = (size: any) => {
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

  return (
    <div className="product__container">
      {/* Navbar */}
      <div className="navbar">
        <h1 className="logo">kalli</h1>
        <button className="back-btn">Back</button>
      </div>

      {/* Product Section */}
      <div className="product-section">
        {/* First Div - Description */}
        <div className="left-column">
          <p className="brand">{currentProduct.category}</p>
          <h2 className="product-title">{currentProduct.title}</h2>
          <p className="product-description">{currentProduct.description}</p>
          <div className="thumbnails">
            {selectedColor?.images.map((image: any, index: any) => (
              <img
                key={index}
                className="thumbnail"
                src={image}
                alt={`thumbnail ${index + 1}`}
                onClick={() => handleThumbnailClick(image)}
              />
            ))}
          </div>
        </div>

        {/* Second Div - Main Image */}
        <div className="main-image-column">
          <img className="main-image" src={mainImage} alt={currentProduct.title} />
          {/* Thumbnails */}

        </div>

        {/* Third Div - Size, Color, Reviews */}
        <div className="details-column">
          {/* Size Options */}
          <div className="size-section">
            <p className="size-label">Size</p>
            <div className="sizes">
              {/* {currentProduct.size.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                  onClick={() => handleSizeClick(size)}
                >
                  {size}
                </button>
              ))} */}
              {[37, 38, 39, 40, 41, 42].map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => handleSizeClick(size)}
                  disabled={!currentProduct.size.includes(size)} // Disable button if size does not exist
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Options */}
          <div className="color-section">
            <p className="color-label">Colour</p>
            <div className="colors">
              {currentProduct.colors.map((color) => (
                <div
                  key={color.name}
                  className={`color ${selectedColor?.name === color.name ? "selected" : ""}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => handleColorClick(color)}
                ></div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="reviews-section">
            <p>Reviews: {currentProduct.rate}★</p>
          </div>

          {/* Price */}
          <p className="price">Price: <span>${currentProduct.price}</span></p>

          {/* Add to Cart Button */}
          <button className="add-to-cart">Add to Cart</button>
        </div>
      </div>

      {/* Footer - Navigation */}
      <div className="footer">
        <ModalPopup videoUrl={currentProduct.video || ""} />
        <button className="nav-btn" onClick={handlePrev}>
          ← Previous
        </button>
        <div className="pagination">
          <span>{currentIndex + 1}</span>/<span>{products.length}</span>
        </div>
        <button className="nav-btn" onClick={handleNext}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default SneakerProductCarousel;
