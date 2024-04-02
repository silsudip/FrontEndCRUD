import * as React from 'react';
import { IMyService } from "../services/business/IMyService";
import { useAppDispatch } from '../redux/stores/store';
import { useNavigate } from 'react-router-dom';
import { deleteProductThunkAsync, getAllProductsThunkAsync, resetProducts, setSelectedProduct } from '../redux/reducers/product';
import { IProduct } from '../models/interfaces/IProduct';
import { useSelector } from 'react-redux';
import { selectLoading, selectProducts } from '../redux/selectors/product';
import { useEffect, useState } from 'react';
import { Button, createTableColumn, DataGrid, DataGridBody, DataGridCell, DataGridHeader, DataGridHeaderCell, DataGridProps, DataGridRow, TableColumnDefinition } from '@fluentui/react-components';
import {
    Add24Regular,
    Delete24Regular,
    Edit24Regular
} from "@fluentui/react-icons";

export interface IProductsProps {
    service: IMyService | undefined;
}
const columns: TableColumnDefinition<IProduct>[] = [
    createTableColumn<IProduct>({
        columnId: "title",
        compare: (a, b) => {
            return a.description.localeCompare(b.description);
        },
        renderHeaderCell: () => {
            return "Title";
        },
        renderCell: (item) => {
            return item.description;
        },
    })
];
const Products: React.FunctionComponent<IProductsProps> = ({ service }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const products: IProduct[] = useSelector(selectProducts);
    const userLoading: boolean = useSelector(selectLoading);

    const [selectedItem, setSelectedItem] = useState<IProduct | undefined>(undefined);

    const loadProducts = (): void => {
        dispatch(getAllProductsThunkAsync(service)).then(() => {
        }).catch((error) => {
        });
    }

    useEffect(() => {
        if (service) {
            console.log(service);
            loadProducts();
        }
    }, [service]);

    useEffect(() => {
        console.log('All products', products);
    }, [products]);

    const onSelectionChange: DataGridProps["onSelectionChange"] = (e, data) => {
        data.selectedItems.forEach(r => {
            console.log(r, products[+r]);
            setSelectedItem(products[+r]);
        })
    };


    const addProduct = (): void => {
        navigate(`/new`);
    }

    const editProduct = (): void => {
        if (selectedItem) {
            navigate(`/edit/${selectedItem.id}`);
            dispatch(setSelectedProduct(selectedItem));
        }
        else {
            navigate(`/new`);
        }
    }

    const deleteProduct = (): void => {
        console.log('delete product');
        dispatch(deleteProductThunkAsync({ myService: service, product: selectedItem })).then(() => {
            dispatch(resetProducts());
            loadProducts();
        }).catch((error) => {
        });
    }


    return (
        <>
            <div>
                <div>
                    <Button appearance='primary' onClick={() => addProduct()} icon={<Add24Regular />}>
                        New Demand
                    </Button>
                    <Button onClick={() => editProduct()} disabled={selectedItem === undefined} icon={<Edit24Regular />}>
                        Edit
                    </Button>
                    <Button appearance="transparent" onClick={() => deleteProduct()} disabled={selectedItem === undefined} icon={<Delete24Regular />}>
                        Delete
                    </Button>
                </div>
            </div>
            <div>
                {products && <DataGrid
                    items={products}
                    columns={columns}
                    selectionMode="single"
                    // defaultSelectedItems={defaultSelectedItems}
                    onSelectionChange={onSelectionChange}>
                    <DataGridHeader>
                        <DataGridRow>
                            {({ renderHeaderCell }) => (
                                <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                            )}
                        </DataGridRow>
                    </DataGridHeader>
                    <DataGridBody<IProduct>>
                        {({ item, rowId }) => (
                            <DataGridRow<IProduct>
                                key={rowId}
                                selectionCell={{ radioIndicator: { "aria-label": "Select row" } }}>
                                {({ renderCell }) => (
                                    <DataGridCell>{renderCell(item)}</DataGridCell>
                                )}
                            </DataGridRow>
                        )}
                    </DataGridBody>
                </DataGrid>}
            </div>
        </>
    );
}

export default Products;