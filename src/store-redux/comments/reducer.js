import actions from "./actions";

export const initialState = {
    items:[],
    waiting: false,
}

// Обработчик действий
function reducer(state = initialState, action) {
    switch (action.type) {
        case "comments/load-start":
            return { ...state, items: [], waiting: true };

        case "comments/load-success":
            return { ...state, items: action.payload.data, waiting: false };

        case "comments/load-error":
            return { ...state, items: [], waiting: false };

        case "comments/add-start":
            return { ...state, waiting: true };

        case "comments/add":
            return { ...state, items:[...state.items, action.payload.item], waiting:false };

        case "comments/add-end":
            return { ...state, waiting: false };

        default:
            return state;
    }
}

export default reducer;