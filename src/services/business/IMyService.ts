import { IProduct } from "../../models/interfaces/IProduct";

export interface IMyService {
    getProducts(): Promise<IProduct[]>;
    getProductById(id:number): Promise<IProduct | undefined>;
    deleteProductById(id:number): Promise<boolean>;
    addUpdateProduct(productItem: IProduct): Promise<number>;
}