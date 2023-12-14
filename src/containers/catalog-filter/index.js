import {memo, useCallback, useEffect, useMemo, useState } from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {

  const store = useStore();

  const { t } = useTranslate();

  const [category, setCategory] = useState([{ value: "", title: "Все" }])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/v1/categories?fields=_id,title,parent(_id)&limit=*");
      const json = await response.json();

      const updatedCategories=[];
      const processedItems=[];
      function recursionPush(list,depth){
        list.map((item) => {
          if(!processedItems.includes(item._id)){
            const children=json.result.items.filter(children=>item._id===children.parent?._id)
            if(children){
              processedItems.push(item._id);
              updatedCategories.push({value:item._id, title:"- ".repeat(depth)+item.title})
              recursionPush(children,depth + 1)
            }
          }
      });
      }
      recursionPush(json.result.items,0)

      setCategory(prevState => [
        ...prevState,
        ...updatedCategories
      ]);
    }

    fetchData();
  }, []);

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    category: state.catalog.params.category,
    query: state.catalog.params.query,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Фильтрация
    onFilter: useCallback(category => store.actions.catalog.setParams({ category, page: 1 }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    sort: useMemo(() => ([
      { value: 'order', title: t('filter.inOrder') },
      { value: 'title.ru', title: t('filter.byNaming') },
      { value: '-price', title: t('filter.firstExpensive') },
      { value: 'edition', title: t('filter.ancient') },
    ]), [t]),
    category: useMemo(() => ([
      ...category
    ]),[t,category])
  };

  return (
    <SideLayout padding='medium'>
      <Select options={options.category} value={select.category} onChange={callbacks.onFilter} />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
        delay={1000} />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);
