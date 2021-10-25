import {useState} from 'react';
import {useContext} from "react";

import classes from './HeaderBasketButton.module.css';
import BasketContext from "../../store/basket-context";

const HeaderBasketButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  const basketCtx = useContext(BasketContext);

  const numberOfBasketItem = basketCtx.items.reduce((curNumber, item) => {
      return curNumber + item.amount;
    },0);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>

      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfBasketItem}</span>
    </button>
  );
};

export default HeaderBasketButton;
