import { memo, useCallback, useEffect } from 'react';
import Item from "../../../components/item";
import ItemBasket from "../../../components/item-basket";
import Head from "../../../components/head";
import BasketTool from "../../../components/basket-tool";
import List from "../../../components/list";
import Basket from "../../../components/basket";
import useStore from "../../../store/use-store";
import useSelector from "../../../store/use-selector";
import LocalizedText from '../../../i18n/components/localized-text';

function Main() {

    const store = useStore();

    useEffect(() => {
        store.actions.catalog.load(10)
    }, []);

    const select = useSelector(state => ({
        list: state.catalog.list,
        basketList:state.basket.list,
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
        changeLocale: useCallback((newLocale)=> newLocale!==select.locale && store.actions.language.changeLocale(newLocale),[select.locale])
    }

    const renders = {
        item: useCallback((item) => {
            return <Item item={item} onAdd={callbacks.addToBasket} />
        }, [callbacks.addToBasket]),
        itemBasket: useCallback((item) => {
            return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} onClose={callbacks.closeModal} />
        }, [callbacks.removeFromBasket]),
    };

    return (
        <>
            <Head title={<LocalizedText id="shop" />} locale={select.locale} changeLocale={callbacks.changeLocale}/>
            <BasketTool onOpen={callbacks.openModalBasket}
                amount={select.amount}
                sum={select.sum}
                locale={select.locale} />
            <List list={select.list} renderItem={renders.item} />
            {select.activeModal === 'basket' &&
                <Basket sum={select.sum}
                    list={select.basketList}
                    onClose={callbacks.closeModal}
                    renderItem={renders.itemBasket}
                />}
        </>

    );
}

export default memo(Main);
