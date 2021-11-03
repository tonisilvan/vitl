import React from 'react';

const BasketContext = React.createContext({
  items: [],
  totalAmount: 0,
  tolerableUpperLimits:[],
  addItem: (item) => {},
  removeItem: (id) => {}
});

export default BasketContext;
