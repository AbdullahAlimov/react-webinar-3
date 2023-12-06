import { useParams } from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import { useEffect, useState,useCallback } from "react";
import { getElementById } from "../../api/api";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import "./style.css"

function Product() {
    const { id } = useParams()

    const store = useStore();

    const select = useSelector(state => ({
        list: state.catalog.list,
        amount: state.basket.amount,
        sum: state.basket.sum
    }));

    const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    }

    const [product, setProduct] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getElementById(id);
                setProduct(response)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [])

    return (
        <PageLayout>
            <Head title={product.title} />
            <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                sum={select.sum}></BasketTool>
            <div className="Product-content">
                <p className="Product-description">
                    {product.description}
                </p>
                <p>Страна производитель: <span>{product._id}</span></p>
                <p>Категория: <span>{product._id}</span></p>
                <p>Год выпуска: <span>{product.edition}</span></p>
                <p className="Product-price">Цена: {product.price} ₽</p>
                <button onClick={()=>{callbacks.addToBasket(product._id)}}>Добавить</button>
            </div>
        </PageLayout>
    );
};

export default Product;