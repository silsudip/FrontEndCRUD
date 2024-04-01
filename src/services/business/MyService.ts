import { IProduct } from "../../models/interfaces/IProduct";
import { IMyService } from "./IMyService";

export class MyService implements IMyService {
    getProducts(): Promise<IProduct[]> {
        throw new Error("Method not implemented.");
    }
    deleteProductById(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    addUpdateProduct(productItem: IProduct): Promise<number> {
        throw new Error("Method not implemented.");
    }
}