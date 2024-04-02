import * as React from 'react';
import { IMyService } from "../services/business/IMyService";
import { useAppDispatch } from '../redux/stores/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProductByIdThunkAsync, resetProduct, resetProducts, setSelectedProduct } from '../redux/reducers/product';
import Utils from '../services/Utils';
import { IProduct } from '../models/interfaces/IProduct';
import { useSelector } from 'react-redux';
import { selectSelectedProduct } from '../redux/selectors/product';
import { ChangeEvent, useEffect, useState } from 'react';
import { Checkbox, Option, CheckboxOnChangeData, Combobox, Field, Input, InputOnChangeData, SelectionEvents, OptionOnSelectData, Button } from '@fluentui/react-components';
import CustomDateFeild from './CustomDateFeild';

export interface IEditProductProps {
    service: IMyService | undefined;
}

const EditProduct: React.FunctionComponent<IEditProductProps> = ({ service }) => {

    const searchParams = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const product: IProduct | undefined = useSelector(selectSelectedProduct);
    const options = ["Vagetables", "Toy", "Car", "Meat"];

    const [description, setDescription] = useState<string>('');
    const [canExpire, setCanExpire] = useState<boolean>(false);
    const [expiryDate, setExpiryDate] = useState<Date | null | undefined>(undefined);
    const [category, setCategory] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [isSpecial, setIsSpecial] = useState<boolean>(false);


    const createProduct = (): void => {
        dispatch(setSelectedProduct(Utils.GetNewProduct()));
    };

    const loadProduct = (): void => {
        if (searchParams.search.toUpperCase().indexOf('NEW') !== -1) {
            createProduct();
        }
        else {
            const paramId: number = +searchParams.search.split('=')[1];
            if (product === undefined) {
                dispatch(getProductByIdThunkAsync({ myService: service, id: paramId })).then().catch((error) => {
                });
            } else if (paramId !== product.id) {
                dispatch(resetProduct());
                dispatch(getProductByIdThunkAsync({ myService: service, id: paramId })).then().catch((error) => {
                });
            }
        }
    }


    const loadProducts = (): void => {
        dispatch(resetProducts());
        navigate('/products');
    }

    useEffect(() => {
        if (service) {
            loadProduct();
        }
    }, [searchParams.search]);

    const saveProduct = (): void => {
    };
    const cancelEdit = (): void=>{
        dispatch(resetProduct());
        navigate('/products');
    }
    const onChangeDescriptionVal = (ev: ChangeEvent<HTMLInputElement>, data: InputOnChangeData): void => {
        const tmpValue: string = data === undefined ? '' : data.value.toString();
        if (product !== undefined) {
            dispatch(setSelectedProduct({ ...product, description: tmpValue }));
        }
        setDescription(tmpValue);
    };
    const onChangePriceVal = (ev: ChangeEvent<HTMLInputElement>, data: InputOnChangeData): void => {
        const tmpValue: number = data === undefined ? 0 : +data.value;
        if (product !== undefined) {
            dispatch(setSelectedProduct({ ...product, price: tmpValue }));
        }
        setPrice(tmpValue);
    };
    const onChangeCanExpireVal = (ev: ChangeEvent<HTMLInputElement>, data: CheckboxOnChangeData): void => {
        const tmpValue: boolean = data === undefined ? false : data.checked == true ? true : false;

        if (product !== undefined) {
            dispatch(setSelectedProduct({ ...product, canExpire: tmpValue }));
        }
        setCanExpire(tmpValue);
    };
    const onIsSpecialVal = (ev: ChangeEvent<HTMLInputElement>, data: CheckboxOnChangeData): void => {
        const tmpValue: boolean = data === undefined ? false : data.checked == true ? true : false;

        if (product !== undefined) {
            dispatch(setSelectedProduct({ ...product, isSpecial: tmpValue }));
        }
        setIsSpecial(tmpValue);
    };
    const onChangeExpiryDateVal = (date: Date | null | undefined): void => {
        setExpiryDate(date);
    };
    const onChangeCategoryVal = (event: SelectionEvents, data: OptionOnSelectData): void => {
        console.log('Option change', data);
    }
    return (
        <div>
            <div>
                <Field label="Description">
                    <Input onChange={onChangeDescriptionVal} />
                </Field>

                <Field label="Can Expire?">
                    <Checkbox
                        checked={canExpire}
                        onChange={onChangeCanExpireVal}
                        label="Checked"
                    />
                </Field>

                <Field label="Expiry Date" size='medium'>
                    <CustomDateFeild date={expiryDate} onChangeDateVal={onChangeExpiryDateVal} />
                </Field>

                <Field label="Category">
                    <Combobox onOptionSelect={onChangeCategoryVal}>
                        {options.map((option) => (
                            <Option key={option}>
                                {option}
                            </Option>
                        ))}
                    </Combobox>
                </Field>

                <Field label="Price">
                    <Input onChange={onChangePriceVal} />
                </Field>

                <Field label="Is Special?">
                    <Checkbox
                        checked={canExpire}
                        onChange={onIsSpecialVal}
                        label="Checked"
                    />
                </Field>
            </div>
            <div>
                <Button onClick={() => saveProduct()} >
                    Save
                </Button>
                <Button appearance="outline" onClick={() => cancelEdit()}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}

export default EditProduct;