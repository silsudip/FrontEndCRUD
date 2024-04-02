import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../models/interfaces/IProduct";
import { IMyService } from "../../services/business/IMyService";
import { ConsoleLogger } from "../../models/classes/ConsoleLogger";

export interface IProductState {
    products: IProduct[];
    selectedProduct: IProduct | undefined;
    loading: boolean;
    error: string | undefined;
}

const initialState: IProductState = {
    products: [],
    selectedProduct: undefined,
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
export const getProductByIdThunkAsync = createAsyncThunk<IProduct | undefined, { myService: IMyService | undefined, id: number }, { rejectValue: string }>(
    "fetchproductbyid",
    async (args, thunkAPI) => {
        try {
            if (args.myService === undefined) {
                return thunkAPI.rejectWithValue("Failed to get product as service is not defined.");
            }
            else {
                const product: IProduct | undefined= await args.myService.getProductById(args.id);
                return product;
            }
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch product.");
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
        builder.addCase(getProductByIdThunkAsync.pending, (state) => {
                state.loading = true;
                state.error = initialState.error;
            })
            .addCase(getProductByIdThunkAsync.fulfilled, (state, action) => {
                // setTimeout(() => {
                state.loading = false;
                state.selectedProduct = action.payload;
                // }, 3000);
            })
            .addCase(getProductByIdThunkAsync.rejected, (state, action) => {
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
        setSelectedProduct: (state, action: PayloadAction<IProduct>) => {
            state.selectedProduct = action.payload
        },
        resetProduct: (state) => {
            state.selectedProduct= initialState.selectedProduct;
        },
        resetProducts: (state) => {
            state.products = initialState.products;
        }
    }
})

export const { setSelectedProduct, resetProduct , resetProducts } = productSlice.actions;


export default productSlice.reducer;