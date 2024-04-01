import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../models/interfaces/IProduct";
import { IMyService } from "../../services/business/IMyService";
import { ConsoleLogger } from "../../models/classes/ConsoleLogger";

export interface IProductState {
    products: IProduct[];
    loading: boolean;
    error: string | undefined;
}

const initialState: IProductState = {
    products: [
        { "id": 1, "description": "Carrot", "canExpire": true, "expiryDate": "2024-04-30", "category": "Vegetables", "price": 1.99, "isSpecial": false },
        { "id": 2, "description": "Beef", "canExpire": false, "expiryDate": "", "category": "Meat", "price": 9.99, "isSpecial": true },
        { "id": 3, "description": "Tomato", "canExpire": true, "expiryDate": "2024-04-30", "category": "Vegetables", "price": 2.49, "isSpecial": true },
        { "id": 4, "description": "Chicken", "canExpire": false, "expiryDate": "", "category": "Meat", "price": 7.99, "isSpecial": false },
        { "id": 5, "description": "Apple", "canExpire": true, "expiryDate": "2024-04-30", "category": "Fruits", "price": 0.99, "isSpecial": false }
    ],
    loading: false,
    error: undefined
}

export const getAllProductsThunkAsync = createAsyncThunk<IProduct[], IMyService | undefined, { rejectValue: string }>(
    "fetchproducts",
    async (myService, thunkAPI) => {
        const logger = new ConsoleLogger();
        try {
            if (myService === undefined) {
                return thunkAPI.rejectWithValue("Failed to get products as service is not defined.");
            }
            else {
                const products: IProduct[] = await myService.getProducts();
                return products;
            }
        } catch (error) {
            logger.error(error);
            return thunkAPI.rejectWithValue("Failed to fetch products.");
        }
    }
);


export const updateProductThunkAsync = createAsyncThunk<IProduct, { myService: IMyService | undefined, product: IProduct | undefined }, { rejectValue: string }>(
    "updateproduct",
    async (args, thunkAPI) => {
        const logger = new ConsoleLogger();
        try {
            if (args.myService === undefined || args.product=== undefined) {
                return thunkAPI.rejectWithValue("Failed to update product as service or product is not defined.");
            }
            else {
                const result: number = await args.myService.addUpdateProduct(args.product);

                return { ...args.product, Id: result };
            }
        } catch (error) {
            logger.error(error);
            return thunkAPI.rejectWithValue("Failed to update product.");
        }
    }
);

export const deleteProductThunkAsync = createAsyncThunk<boolean, { myService: IMyService | undefined, product: IProduct | undefined }, { rejectValue: string }>(
    "deleteproduct",
    async (args, thunkAPI) => {
        const logger = new ConsoleLogger();
        try {
            if (args.myService === undefined || args.product === undefined) {
                return thunkAPI.rejectWithValue("Failed to delete product as service or product is not defined.");
            }
            else {
                const result: boolean = await args.myService.deleteProductById(args.product.id);
                return result;
            }
        } catch (error) {
            logger.error(error);
            return thunkAPI.rejectWithValue("Failed to delete product.");
        }
    }
);

export const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllProductsThunkAsync.pending, (state) => {
                state.loading = true;
                state.error = initialState.error;
            })
            .addCase(getAllProductsThunkAsync.fulfilled, (state, action) => {
                // setTimeout(() => {
                state.loading = false;
                state.products = action.payload;
                // }, 3000);
            })
            .addCase(getAllProductsThunkAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })
        builder
            .addCase(updateProductThunkAsync.pending, (state) => {
                state.loading = true;
                state.error = initialState.error;
            })
            .addCase(updateProductThunkAsync.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateProductThunkAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })
        builder
            .addCase(deleteProductThunkAsync.pending, (state) => {
                state.loading = true;
                state.error = initialState.error;
            })
            .addCase(deleteProductThunkAsync.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteProductThunkAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })
    },
    reducers: {
        resetProducts: (state) => {
            state.products = initialState.products;
        }
    }
})

export const { resetProducts } = productSlice.actions;


export default productSlice.reducer;