import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce';
import Navbar from './Components/Navbar/Navbar'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './Components/CheckoutForm/Checkout/Checkout';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({})

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        // const {cart} = await commerce.cart.add(productId, quantity);

        setCart(item.cart)
        // setCart(cart)
    }

    const handleUpdateCartQuantity = async (productId, quantity) => {

        // const {cart} = await commerce.cart.update(productId, quantity);
        const response = await commerce.cart.update(productId, { quantity });

        // setCart(cart)
        setCart(response.cart)
    }

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);

        setCart(cart);
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();

        setCart(cart);
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    console.log(cart);
    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path="/">
                        <Products products={products} onAddToCart={handleAddToCart} />
                    </Route>
                    <Route exact path="/cart">
                        <Cart
                            cart={cart}
                            handleUpdateCartQuantity={handleUpdateCartQuantity}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout/>
                    </Route>
                </Switch>
            </div>
        </Router>

    )
}

export default App
