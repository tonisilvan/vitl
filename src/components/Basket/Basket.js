import { useContext, useEffect, useState } from "react";
import React from "react";
import classes from "./Basket.module.css";
import Modal from "../UI/Modal/Modal";
import BasketContext from "../../store/basket-context";
import BasketItem from "./BasketItem";

const Basket = (props) => {
  const basketCtx = useContext(BasketContext);
  const totalAmount = `${basketCtx.totalAmount.toFixed(2)} GBP`;
  const hasItems = basketCtx.items.length > 0;
  const [valid, setValid] = useState(true);
  const isValid = () => {
    for (let item of basketCtx.items) {
      for (let nutrient of item.nutrients) {
        const tul = item.amount * nutrient.amount;
        const limit = basketCtx.tolerableUpperLimits.find(
            (limit) => limit.id === nutrient.id
        );
        if (tul > limit.amount) {
          setValid(false);
          return;
        } else {
          setValid(true);
        }
      }
    };
  }

  useEffect(() => {
    if (basketCtx.items.length > 0) {
      isValid();
    }

    basketCtx.items.forEach((item) => {
      item.nutrients.forEach((nutrient) => {});
    });
  }, [basketCtx.items]);

  const basketItemRemoveHandler = (id) => {
    basketCtx.removeItem(id);
  };

  const basketItemAddHandler = (item) => {
    basketCtx.addItem({ ...item, amount: 1 });
  };

  const basketItems = (
    <ul className={classes["basket-items"]}>
      {basketCtx.items.map((item) => (
        <BasketItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={basketItemRemoveHandler.bind(null, item.id)}
          onAdd={basketItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {basketItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button-alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button
            disabled={!valid}
            className={
              !valid ? classes.button && classes.disabled : classes.button
            }
          >
            Order
          </button>
        )}
        {!valid && (
          <p className={classes.red}>
            You reached the limit TUL (Tolerable Upper Limit: the maximum level
            of daily nutrient intake that is likely safe and without adverse
            side-effects).
          </p>
        )}
      </div>
      <div></div>
    </Modal>
  );
};

export default Basket;
