// defines the product and product color field structure
type colorType = {
  color: string;
  stock: number;
  colorCode : string;
};

type productType = {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  isPopular:boolean;
  colors: colorType[];
};

export default productType;