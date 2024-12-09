import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import productType from "../../components/products/ProductType";
import { toast } from "react-toastify";

type cartItemType = {
    product: productType;
    quantity: number;
    selectedColor: string;
}

type cartStateType = {
    items: cartItemType[];
    cartCounter: number;
}


const initalCartState = () : cartStateType => {
    const cartState = localStorage.getItem("Cart");
    return cartState ? JSON.parse(cartState) : { items: [] as cartItemType[] , cartCounter: 0 };
} 
  
const calculateCartCounter = (items: cartItemType[]) => 
    items.reduce((total, item) => total + item.quantity, 0);


export const cartSlice = createSlice({
    name: "cart",
    initialState: initalCartState(),
    reducers: {
        addToCart: (state, action: PayloadAction<{ product: productType, selectedColor: string }>) => {
            const { product, selectedColor } = action.payload;
            const productStock = product.colors.find(color => color.color === selectedColor)?.stock || 0;
            if (productStock <= 0) {
                toast.info("Selected color is out of stock!");
                return;
            }
            const existingItem = state.items.find(item => item.product.id === product.id && item.selectedColor === selectedColor);
            if (existingItem) {
                existingItem.quantity += 1;
                state.cartCounter += 1;
                toast.success("Product quantity updated in cart");
            } else {
                state.items.push({ product, quantity: 1, selectedColor })
                state.cartCounter += 1;
                toast.success("Added to the cart");
            }
            state.cartCounter = calculateCartCounter(state.items);
        },
        removerFromCart: (state, action: PayloadAction<{ productID: number, selectedColor: string }>) => {
            const { productID, selectedColor } = action.payload;
            const updatedItems = state.items.filter(
                (item) => item.product.id !== productID || item.selectedColor !== selectedColor
            );
            const removedItemsCount = state.items.length - updatedItems.length;
            state.cartCounter -= removedItemsCount;
            state.items = updatedItems;
            toast.info("Removed from the cart!");
            state.cartCounter = calculateCartCounter(state.items);
        },
        increaseQty: (state, action: PayloadAction<{ productID: number, selectedColor: string }>) => {
            const { productID, selectedColor } = action.payload;
            // Find the index of the item in the cart
            const itemIndex = state.items.findIndex(
                (item) => item.product.id === productID && item.selectedColor === selectedColor
            );
            // If the item is found in the cart
            if (itemIndex !== -1) {
                const currentItem = state.items[itemIndex];
                // Get the stock of the selected color
                const productStock = currentItem.product.colors.find((color) => color.color === selectedColor)?.stock || 0;
                // If the quantity is less than the stock, increase the quantity
                if (currentItem.quantity < productStock) {
                    currentItem.quantity += 1;
                    state.cartCounter += 1;
                    toast.success("Product quantity updated");
                } else {
                    // If the stock is reached, show an info message
                    toast.info("Cannot add more of this item. Stock limit reached!");
                }
            }
            state.cartCounter = calculateCartCounter(state.items);
        },
        decreaseQty: (state, action: PayloadAction<{ productID: number, selectedColor: string }>) => {
            const { productID, selectedColor } = action.payload;
            // Find the index of the item in the cart
            const itemIndex = state.items.findIndex(
                (item) => item.product.id === productID && item.selectedColor === selectedColor
            );
            // If the item is found in the cart
            if (itemIndex !== -1) {
                const currentItem = state.items[itemIndex];
                if (currentItem.quantity > 1) {
                    currentItem.quantity -= 1;
                    state.cartCounter -= 1;
                    toast.success("Product quantity updated");
                } else if (currentItem.quantity === 1) {
                    toast.info("Quantity cannot go below 1. Consider removing the item instead");
                }
            }
            state.cartCounter = calculateCartCounter(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            state.cartCounter = 0;
        },
    }
});



export const { addToCart , removerFromCart , increaseQty , decreaseQty , clearCart } = cartSlice.actions;
export default cartSlice.reducer;
