import { IProduct } from "../models/interfaces/IProduct";

export default class Utils {
    
    static getFormatDate(date?: Date): string {
        return !date ? '' : date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }

    static GetNewProduct(): IProduct{
        const tmpProductObj: IProduct =  {
            id: 0,
            description: '',
            canExpire: false,
            expiryDate: '',
            category: '',
            price: 0,
            isSpecial: false
        } as IProduct;

        return tmpProductObj;

    }
}