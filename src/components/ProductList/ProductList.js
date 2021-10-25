import React, {useCallback, useContext, useEffect, useState} from "react";
import Product from "../Product/Product";
import Card from "../UI/Card/Card";
import BasketContext from "../../store/basket-context";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const basketCtx = useContext(BasketContext);
  const fetchProductsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
          "https://vitl-static-api.s3-eu-west-1.amazonaws.com/fe-test.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const transformedProducts = data.products.map((productData) => {
        return {
          id: Math.trunc(Math.random().toString() * 100000000),
          name: productData.name,
          price: productData.price,
          nutrients: productData.nutrients,
        };
      });

      setProducts(transformedProducts);
      basketCtx.loadLimits(data.config.tolerableUpperLimits);

    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  let noContent = <p>Found no products.</p>;

  if (error) {
    noContent = <p>{error}</p>;
  }

  if (isLoading) {
    noContent = <p>Loading...</p>;
  }

  useEffect(() => {
    fetchProductsHandler();
  }, [fetchProductsHandler]);

  return (
    <section>
      <Card>
        {products.length > 0
            ? <ul>
              {products.length > 0 && products.map((product) => (
                  <Product
                      id={product.id}
                      key={product.id}
                      name={product.name}
                      price={product.price}
                      nutrients={product.nutrients}
                  />
              ))}
            </ul>
            : noContent
        }
      </Card>
    </section>
  );
};

export default ProductList;
