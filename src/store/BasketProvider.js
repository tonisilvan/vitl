import {useReducer} from 'react';

import BasketContext from './basket-context';

const defaultBasketState = {
    items: [],
    totalAmount: 0,
    tolerableUpperLimits: []
};

const basketReducer = (state, action) => {
    if (action.type === 'LOAD') {
        return {
            items: state.items,
            totalAmount: state.totalAmount,
            tolerableUpperLimits: action.tolerableUpperLimits
        };
    }

    if (action.type === 'ADD') {
        const updatedTotalAmount =
            state.totalAmount + action.item.price * action.item.amount;

        const existingProductItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        const existingProductItem = state.items[existingProductItemIndex];
        let updatedItems;

        if (existingProductItem) {
            const updatedItem = {
                ...existingProductItem,
                amount: existingProductItem.amount + action.item.amount,
            };
            updatedItems = [...state.items];
            updatedItems[existingProductItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
            tolerableUpperLimits: state.tolerableUpperLimits
        };
    }
    if (action.type === 'REMOVE') {
        const existingBasketItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingBasketItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = {...existingItem, amount: existingItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingBasketItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
            tolerableUpperLimits: state.tolerableUpperLimits
        };
    }

    return defaultBasketState;
};

const BasketProvider = (props) => {
    const [basketState, dispatchBasketAction] = useReducer(
        basketReducer,
        defaultBasketState
    );

    const addItemToBasketHandler = (item) => {
        dispatchBasketAction({type: 'ADD', item: item});
    };

    const removeItemFromBasketHandler = (id) => {
        dispatchBasketAction({type: 'REMOVE', id: id});
    };

    const loadTolerableUpperLimitsHandler = (tolerableUpperLimits) => {
        dispatchBasketAction({type: 'LOAD', tolerableUpperLimits: tolerableUpperLimits});
    };

    const basketContext = {
        items: basketState.items,
        totalAmount: basketState.totalAmount,
        tolerableUpperLimits: basketState.tolerableUpperLimits,
        addItem: addItemToBasketHandler,
        removeItem: removeItemFromBasketHandler,
        loadLimits: loadTolerableUpperLimitsHandler
    };

    return (
        <BasketContext.Provider value={basketContext}>
            {props.children}
        </BasketContext.Provider>
    );
};

export default BasketProvider;
