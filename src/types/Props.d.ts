type ProductProps = {
    products: Product[]
}
type ThumbnailProps = {
  mainImage: string, 
  images: string[], 
  handleThumbnailClick: (image: string) => void 
}
type ProductNavigationProps = {
    handlePrev: () => void;
    handleNext: () => void;
    products: Product[];
    currentIndex: number;
    handlePaginationDots: (index: number) => void;
}
type ProductDetailsProps = {
    currentProduct: Product;
    selectedSize: number | null;
    selectedColor: Color | null;
    handleSizeClick: (size: number) => void;
    handleColorClick: (color: Color) => void;
}
type WishlistButtonProps = {
    isInWishlist: boolean, 
    handleToggleWishlist: () => void 
}
type CartButtonProps = {
    handleAddToCart: () => void 
}