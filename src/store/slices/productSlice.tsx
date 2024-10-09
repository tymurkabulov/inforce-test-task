import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { productService } from "../../services/productService";
import { IProduct } from "../../interfaces/IProduct";


export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const products = await productService.getAll();
    return products;
});

interface ProductState {
    products: IProduct[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<IProduct>) => {
            state.products.push(action.payload);
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(p => p.id !== action.payload);
        },
        editProduct: (state, action: PayloadAction<IProduct>) => {
            const index = state.products.findIndex(p => p.id === action.payload.id);
            if (index !== -1) state.products[index] = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            });
    },
});

export const { addProduct, deleteProduct, editProduct } = productSlice.actions;
export default productSlice.reducer;
