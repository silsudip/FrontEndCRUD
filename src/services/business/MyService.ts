import { ConsoleLogger } from "../../models/classes/ConsoleLogger";
import { IProduct } from "../../models/interfaces/IProduct";
import { IMyService } from "./IMyService";

export class MyService implements IMyService {
    private AllProducts: IProduct[] = [
        { "id": 1, "description": "Carrot", "canExpire": true, "expiryDate": "2024-04-30", "category": "Vegetables", "price": 1.99, "isSpecial": false },
        { "id": 2, "description": "Beef", "canExpire": false, "expiryDate": "", "category": "Meat", "price": 9.99, "isSpecial": true },
        { "id": 3, "description": "Tomato", "canExpire": true, "expiryDate": "2024-04-30", "category": "Vegetables", "price": 2.49, "isSpecial": true },
        { "id": 4, "description": "Chicken", "canExpire": false, "expiryDate": "", "category": "Meat", "price": 7.99, "isSpecial": false },
        { "id": 5, "description": "Apple", "canExpire": true, "expiryDate": "2024-04-30", "category": "Fruits", "price": 0.99, "isSpecial": false }
    ];
    public async getProductById(id: number): Promise<IProduct | undefined> {
        const logger = new ConsoleLogger();
        try {
            for(let i=0;i<this.AllProducts.length;i++){
                if(this.AllProducts[i].id === id){
                    return this.AllProducts[i];
                }
            }
            return undefined;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
    public async getProducts(): Promise<IProduct[]> {
        const logger = new ConsoleLogger();
        try {
            const products: IProduct[] = this.AllProducts;
            return Promise.resolve(products);

        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
    public async deleteProductById(id: number): Promise<boolean> {
        const logger = new ConsoleLogger();
        try {
            this.AllProducts = this.AllProducts.filter(p => p.id !== id);
            return Promise.resolve(true);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
    public async addUpdateProduct(productItem: IProduct): Promise<number> {
        const logger = new ConsoleLogger();
        try {
            const tmpNewProductId:number = this.AllProducts.length;
            this.AllProducts = [...this.AllProducts, { ...productItem, id: tmpNewProductId }];
            return Promise.resolve(tmpNewProductId);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}