import { FaHeart } from "react-icons/fa";

const WishlistButton = ({ isInWishlist, handleToggleWishlist }: WishlistButtonProps) => {
  return (
    <div className="wishlist-icon" onClick={handleToggleWishlist}>
      <FaHeart size={24} color={isInWishlist ? "red" : "black"} />
    </div>
  );
};

export default WishlistButton;
