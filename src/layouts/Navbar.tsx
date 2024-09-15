import { FaShoppingCart } from "react-icons/fa";

const Navbar = ({ cartItemsLength, handlePrev = () => {} }: { cartItemsLength: number ,handlePrev: () => void }) => {
  return (
    <div className="navbar">
      <h1 className="logo">kalli</h1>
        <button className="back-btn" onClick={handlePrev}>Back</button>
      <div className="cart-icon">
        <FaShoppingCart size={24} />
        {cartItemsLength > 0 && <span className="cart-badge">{cartItemsLength}</span>}
      </div>
    </div>
  );
};

export default Navbar;
