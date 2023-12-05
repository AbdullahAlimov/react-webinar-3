import { memo } from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Product from "../../pages/product";
import App from "../../app";


function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<App/>} path='/' />
                <Route element={<Product />} path='/product/:id' />
            </Routes>
        </BrowserRouter>
    );
};

export default memo(Router);