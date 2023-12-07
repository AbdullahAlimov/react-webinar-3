

async function getCatalog () {
    const response = await fetch('/api/v1/articles');
    const json = await response.json();
    return json.result.items;
}

async function getElementById (id) {
    const response = await fetch(`api/v1/articles/${id}?fields=_id,title,description,price,edition,madeIn(title,code),category(title)`);
    const json = await response.json();
    return json.result;
}

async function getPaginationCatalog (paginationValue,limit) {
    const response = await fetch(`api/v1/articles?limit=${limit}&skip=${paginationValue-1*limit}&fields=items(_id, title, price)`);
    const json = await response.json();
    return json.result.items;
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