

async function getCatalog () {
    const response = await fetch('/api/v1/articles');
    const json = await response.json();
    return json.result.items;
//    this.setState({
//        ...this.getState(),
//        list: json.result.items
//    }, 'Загружены товары из АПИ');
}

async function getElementById (id) {
    const response = await fetch(`api/v1/articles/${id}`);
    const json = await response.json();
    return json.result;
//    this.setState({
//        ...this.getState(),
//        list: json.result.items
//    }, 'Загружен товар по id из АПИ');
}

async function getPaginationCatalog (paginationValue,limit=10) {
    const response = await fetch(`api/v1/articles?limit=${limit}&skip=${paginationState-1*limit}&fields=items(_id, title, price)`);
    const json = await response.json();
    return json.result.items;
//    this.setState({
//        ...this.getState(),
//        list: json.result.items
//    }, 'Загружена 1 страница пагинации из АПИ');
}

async function getCatalogLength () {
    const response = await fetch('api/v1/articles?fields=items(),count');
    const json = await response.json();
    return json.result.count;
}

export{
    getCatalog,
    getElementById,
    getPaginationCatalog,
    getCatalogLength
}