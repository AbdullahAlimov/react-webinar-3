import { useParams } from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import { useEffect, useState,useCallback,memo } from "react";
import { getElementById } from "../../api/api";
import BasketTool from "../../components/basket-tool";
import Basket from "../../components/basket";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import "./style.css"
import LocalizedText from "../../components/localized-text";


function Product() {
    const { id } = useParams()

    const store = useStore();

    const select = useSelector(state => ({
        activeModal: state.modals.name,
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
                <p><LocalizedText id="made_in"/>: <span>{`${product.madeIn?.title} (${product.madeIn?.code})`}</span></p>
                <p><LocalizedText id="category"/>: <span>{product.category?.title}</span></p>
                <p><LocalizedText id="edition"/>: <span>{product.edition}</span></p>
                <p className="Product-price"><LocalizedText id="price"/>: {product.price} ₽</p>
                <button  className="Product-Button" onClick={()=>{callbacks.addToBasket(product._id)}}><LocalizedText id="add"/></button>
            </div>
            {select.activeModal === 'basket' && <Basket/>}
        </PageLayout>
    );
};

export default memo(Product);