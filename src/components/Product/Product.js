import React from "react";
import classes from "./Product.module.css";
import ProductForm from "../ProductForm/ProductForm";
import {useContext} from "react";
import BasketContext from "../../store/basket-context";

const Product = (props) => {
  const product = {
    id: props.key,
    name: props.name,
    price: props.price,
    nutrients: props.nutrients,
  };

  const basketCtx = useContext(BasketContext);

  const addToBasketHandler = amount => {
      basketCtx.addItem({
          id: props.id,
          name: props.name,
          amount: amount,
          price: props.price,
          nutrients: props.nutrients
      });
  };

  return (
      <li className={classes.product}>
        <div className="product">
          <h3>{product.name}</h3>
          <div className={classes.price}>{`${props.price.toFixed(2)} GBP`}</div>
            <ProductForm id={props.id} onAddBasket={addToBasketHandler}/>
        </div>
      </li>
  );
}
export default Product;
