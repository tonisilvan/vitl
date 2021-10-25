import ProductList from "./components/ProductList/ProductList";
import React, {useState} from "react";
import Header from "./components/Layout/Header";
import Basket from "./components/Basket/Basket";
import BasketProvider from "./store/BasketProvider";

function App() {
    const [basketIsShown, setBasketIsShown] = useState(false);

    const showBasketHandler = () => {
        setBasketIsShown(true);
    };

    const hideBasketHandler = () => {
        setBasketIsShown(false);
    };

    return (
        <BasketProvider>
            {basketIsShown && <Basket onClose={hideBasketHandler}/>}
            <Header onShowBasket={showBasketHandler}/>
            <main>
                <ProductList/>
            </main>
        </BasketProvider>
    );
}

export default App;
