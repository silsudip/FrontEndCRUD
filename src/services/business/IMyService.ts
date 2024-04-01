import { IProduct } from "../../models/interfaces/IProduct";

export interface IMyService {
    getProducts(): Promise<IProduct[]>;
    deleteProductById(id:number): Promise<boolean>;
    addUpdateProduct(productItem: IProduct): Promise<number>;
}