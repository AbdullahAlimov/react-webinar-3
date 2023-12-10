import { useParams } from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import { useEffect, useState, useCallback, memo } from "react";
import { getElementById } from "../../api/api";
import BasketTool from "../../components/basket-tool";
import Basket from "../../components/basket";
import ItemBasket from "../../components/item-basket";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import "./style.css"
import LocalizedText from "../../i18n/components/localized-text";


function Product() {
    const { id } = useParams()

    const store = useStore();

    const select = useSelector(state => ({
        basketList: state.basket.list,
        amount: state.basket.amount,
        sum: state.basket.sum,
        activeModal: state.modals.name,
        locale: state.language.locale
    }));

    const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
        // Удаление из корзины
        removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
        // Закрытие любой модалки
        closeModal: useCallback(() => store.actions.modals.close(), [store]),
        // Смена локализации
        changeLocale: useCallback((newLocale) => newLocale !== select.locale && store.actions.language.changeLocale(newLocale), [select.locale])
    }

    const renders = {
        itemBasket: useCallback((item) => {
            return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} onClose={callbacks.closeModal} />
        }, [callbacks.removeFromBasket]),
    };

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
            <Head title={product.title} locale={select.locale} changeLocale={callbacks.changeLocale}/>
            <BasketTool onOpen={callbacks.openModalBasket}
                amount={select.amount}
                sum={select.sum}
                locale={select.locale}></BasketTool>
            <div className="Product-content">
                <p className="Product-description">
                    {product.description}
                </p>
                <p><LocalizedText id="made_in" />: <span>{`${product.madeIn?.title} (${product.madeIn?.code})`}</span></p>
                <p><LocalizedText id="category" />: <span>{product.category?.title}</span></p>
                <p><LocalizedText id="edition" />: <span>{product.edition}</span></p>
                <p className="Product-price"><LocalizedText id="price" />: {product.price} ₽</p>
                <button className="Product-Button" onClick={() => { callbacks.addToBasket(product._id) }}><LocalizedText id="add" /></button>
            </div>
            {select.activeModal === 'basket' && <Basket sum={select.sum}
                list={select.basketList}
                onClose={callbacks.closeModal}
                renderItem={renders.itemBasket}
            />}
        </PageLayout>
    );
};

export default memo(Product);