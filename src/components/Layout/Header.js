import { Fragment } from 'react';

import HeaderBasketButton from './HeaderBasketButton';
import vitlImage from '../../assets/home-hero-bg.jpg';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Vitl</h1>
        <HeaderBasketButton onClick={props.onShowBasket} />
      </header>
      <div className={classes['main-image']}>
        <img src={vitlImage} alt='A table full of delicious food!' />
      </div>
    </Fragment>
  );
};

export default Header;
