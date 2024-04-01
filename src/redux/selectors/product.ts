import { IProduct } from "../../models/interfaces/IProduct";
import { RootState } from "../stores/store";

export const selectProducts = (state: RootState): IProduct[] => state.products.products;

export const selectLoading = (state: RootState): boolean => state.products.loading;
