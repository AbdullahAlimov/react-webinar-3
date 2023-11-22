import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: 1, selectionCounter:0, title: 'Название элемента'},
    {code: 2, selectionCounter:0, title: 'Некий объект'},
    {code: 3, selectionCounter:0, title: 'Заголовок'},
    {code: 4, selectionCounter:0, title: 'Очень длинное название элемента из семи слов'},
    {code: 5, selectionCounter:0, title: 'Запись'},
    {code: 6, selectionCounter:0, title: 'Шестая запись'},
    {code: 7, selectionCounter:0, title: 'Седьмая запись'},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
