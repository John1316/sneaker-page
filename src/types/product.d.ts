/* eslint-disable @typescript-eslint/no-explicit-any */
 type Product = {
    id: number
    title: string
    description: string
    category: string
    video: string
    price: string
    rate: number
    size: number[]
    images?: any[]
    colors: Color[]
  }
  
   type Color = {
    name: string
    hex: string
    images: string[]
  }
  
type ProductProps = {
    products: Product[]
}