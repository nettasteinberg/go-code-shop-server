import React, { useContext } from "react";
import { MyContext } from "../../MyContext";
import { ProductInCart } from "../../components/ProductInCart/ProductInCart";
import "./CartPage.css";

export const CartPage = () => {
    const {itemsInCart} = useContext(MyContext);
    return (
        <div className="cart">
            {Object.keys(itemsInCart).length > 0 && <h1>Shopping Cart</h1>}
            <div className="cartItems">
                {Object.keys(itemsInCart).map((id) => <ProductInCart id={id}/>)}
            </div>
        </div>
    )
}

export default CartPage