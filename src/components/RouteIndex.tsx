
import * as React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/stores/store';
import { useEffect, useState } from 'react';
import { IMyService } from '../services/business/IMyService';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Products from './Products';
import EditProduct from './EditProduct';
import { MyService } from '../services/business/MyService';

const RouteIndexComp: React.FunctionComponent = () => {
    const [myService, setMyService] = useState<IMyService>();
    useEffect(() => {
        setMyService(new MyService());
    }, []);
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/products" element={<Products service={myService} />} />
                    <Route path="/edit/*" element={<EditProduct service={myService} />} />
                    <Route path="/new" element={<EditProduct service={myService} />} />
                    <Route path="*" element={<Navigate to="/products" replace={true} />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default RouteIndexComp;