import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Importing the cart icon
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
const ProductDetails = ({
  currentProduct,
  selectedSize,
  selectedColor,
  handleSizeClick,
  handleColorClick,
}:  ProductDetailsProps) => {
  return (
    <div className="details-column">
      {/* Sizes */}
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

      {/* Colors */}
      <div className="color-section">
        <p className="color-label">Color</p>
        <motion.div className="colors" layout>
          {currentProduct.colors.map((color: Color) => (
            <motion.div
              key={color.name}
              className={`color ${selectedColor?.name === color?.name ? "selected" : ""}`}
              style={{ backgroundColor: color?.hex }}
              onClick={() => handleColorClick(color)}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.div>
      </div>

      {/* Reviews */}
      <div className="reviews-section flex justify-between items-center">
        <p>Reviews:</p>
        <div className="stars flex items-center gap-[8px]">
          {renderStars(currentProduct.rate)}
        </div>
      </div>

      {/* Price */}
      <p className="price flex justify-between items-center ">
      Price: <span>${currentProduct.price}</span>
      </p>
    </div>
  );
};

export default ProductDetails;
