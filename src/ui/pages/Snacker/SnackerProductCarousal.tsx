/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

import ModalPopup from "../../components/ModalPopup";
import Navbar from "../../../layouts/Navbar";
import ThumbnailGallery from "../../components/ThumbnailGallery";
import ProductDetails from "../../components/ProductDetails";
import ProductNavigation from "../../components/ProductNavigation";
import CartButton from "../../components/CartButton";
import WishlistButton from "../../components/WishlistButton";
import "./SnackerProduct.css";
import {motion} from 'framer-motion';

const SneakerProductCarousel = ({ products }: ProductProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [mainImage, setMainImage] = useState("");

  const currentProduct = products[currentIndex];


  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    setSelectedSize(null);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    setSelectedSize(null);
  };

  const handleSizeClick = (size: number) => setSelectedSize(size);
  const handleColorClick = (color: Color) => {
    setSelectedColor(color);
    setMainImage(color.images[0]);
  };

  const handleThumbnailClick = (image: string) => setMainImage(image);
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return alert("Please select both size and color.");
    const itemToAdd = { product: currentProduct.title, size: selectedSize, color: selectedColor.name, image: mainImage, price: currentProduct.price };
    setCartItems((prevItems) => {
      const updatedCart = [...prevItems, itemToAdd];

      // Store the updated cart in localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }

  const handleToggleWishlist = () => {
    const isInWishlist = wishlistItems.some((item) => item.product === currentProduct.title);
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
      const itemToAdd = { product: currentProduct.title, size: selectedSize || currentProduct.size[0], color: selectedColor?.name || currentProduct.colors[0].name, image: mainImage, price: currentProduct.price };
      setWishlistItems((prevItems) => {
        const updatedWishlist = [...prevItems, itemToAdd];
  
        // Store the updated wishlist in localStorage
        localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
        return updatedWishlist;
      });
    }
  };

  const isInWishlist = wishlistItems.some((item) => item.product === currentProduct.title);
  useEffect(() => {
    setSelectedColor(currentProduct.colors[0]);
    setMainImage(currentProduct.colors[0].images[0]);
    setSelectedSize(currentProduct.size[0] || null);
  }, [currentProduct]);
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const storedWishlistItems = JSON.parse(localStorage.getItem("wishlistItems") || "[]");

    setCartItems(storedCartItems);
    setWishlistItems(storedWishlistItems);
  }, []);
  return (
    <div className="product__container">
      <Navbar cartItemsLength={cartItems.length} handlePrev={handlePrev} />
      <div className="product-section">
        <div className="left-column">
          <p className="brand">{currentProduct.category}</p>
          <h2 className="product-title">{currentProduct.title}</h2>
          <p className="product-description">{currentProduct.description}</p>
          <ThumbnailGallery mainImage={mainImage} images={selectedColor?.images || []} handleThumbnailClick={handleThumbnailClick} />
        </div>

        <div className="main-image-column">
        <motion.div 
        className="w-full"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
          >
            <img className="main-image" src={mainImage} alt={currentProduct.title} />
            </motion.div>
        </div>

        <ProductDetails
          currentProduct={currentProduct}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          handleSizeClick={handleSizeClick}
          handleColorClick={handleColorClick}
        />
      </div>

      <div className="footer">
        <ModalPopup videoUrl={currentProduct.video || ""} />
        <ProductNavigation handlePrev={handlePrev} handleNext={handleNext} products={products} currentIndex={currentIndex} handlePaginationDots={setCurrentIndex} />
        <div className="footer-item">
          <CartButton handleAddToCart={handleAddToCart} />
          <WishlistButton isInWishlist={isInWishlist} handleToggleWishlist={handleToggleWishlist} />
        </div>
      </div>
    </div>
  );
};

export default SneakerProductCarousel;
