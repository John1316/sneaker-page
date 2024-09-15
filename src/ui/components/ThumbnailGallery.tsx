import { motion } from "framer-motion";

const ThumbnailGallery = ({ 
    images, 
    mainImage,
    handleThumbnailClick 
}: ThumbnailProps) => {
  return (
    <motion.div className="thumbnails" layout>
      {images.map((image, index) => (
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
  );
};

export default ThumbnailGallery;
