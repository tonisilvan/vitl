import React from 'react';

const BasketContext = React.createContext({
  items: [],
  totalAmount: 0,
  tolerableUpperLimits:[],
  addItem: (item) => {},
  removeItem: (id) => {},
  loadLimits: (tolerableUpperLimits) => {}
});

export default BasketContext;
