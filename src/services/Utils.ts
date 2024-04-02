import { IProduct } from "../models/interfaces/IProduct";

export default class Utils {

    static getFormatDate(date?: Date): string {
        return !date ? '' : date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }
    static getDateFromString(dtStr: string): Date | undefined {
        if (dtStr === "") {
            return undefined
        }
        else {
            const tmpDay: number = parseInt(dtStr.split('-')[2]);
            const tmpMonth: number = parseInt(dtStr.split('-')[1]);
            const tmpYear: number = parseInt(dtStr.split('-')[0]);
            return new Date(tmpYear, tmpMonth, tmpDay);
        }
    }
    static GetNewProduct(): IProduct {
        const tmpProductObj: IProduct = {
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