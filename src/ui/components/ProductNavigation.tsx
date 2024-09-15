import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ProductNavigation = ({
  handlePrev,
  handleNext,
  products,
  currentIndex,
  handlePaginationDots,
}: ProductNavigationProps) => {
  return (
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
        {products.map((product, index) => (
          <button
            onClick={() => handlePaginationDots(index)}
            key={product.id}
            className={`pagination-dots ${currentIndex === index ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductNavigation;
