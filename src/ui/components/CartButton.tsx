import { motion } from "framer-motion";

const CartButton = ({ handleAddToCart }: CartButtonProps) => {
  return (
    <motion.button className="add-to-cart" onClick={handleAddToCart} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      Add to Cart
    </motion.button>
  );
};

export default CartButton;
