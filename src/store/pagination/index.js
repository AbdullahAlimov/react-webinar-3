import { getCatalogLength } from "../../api/api";
import StoreModule from "../module";

class Pagination extends StoreModule {

    initState() {
        return {
            list: [],
            length: 0,
            selectItem: 1,
        }
    }

    renderPagination() {
        var newList = []
        const selectItem = this.getState().selectItem;
        const length = this.getState().length;

        newList.push(1);
        if (selectItem > 3) newList.push("...");
        if (selectItem === length) newList.push(selectItem - 2);
        if (!(selectItem === 1 || selectItem === 2)) newList.push(selectItem - 1);
        if (!(selectItem === 1 || selectItem === length)) newList.push(selectItem);
        if (!(selectItem === length || selectItem === length - 1)) newList.push(selectItem + 1);
        if (selectItem === 1) newList.push(selectItem + 2);
        if (selectItem < length - 2) newList.push("...");
        newList.push(length);

        this.setState({
            ...this.getState(),
            list: newList
        }, 'Пагинация обновлена');
    }

    setSelectItem(newSelectItem) {
        this.setState({
            ...this.getState(),
            selectItem: newSelectItem
        }, 'Выбранная страница изменена')
    }

    async load() {
        try {
            const response = await getCatalogLength();
            this.setState({
                ...this.getState(),
                length: Math.ceil(response / 10)
            }, "Добавление длинны");
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        this.renderPagination()
    }

}
export default Pagination;