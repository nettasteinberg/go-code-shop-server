import React, { useContext } from "react";
import { MyContext } from "../../MyContext";
import { Button } from "../Button/Button";
import "./ProductInCart.css";

export const ProductInCart = ({id}) => {
    const {itemsInCart, setItemsInCart} = useContext(MyContext);
    
    const removeFromCart = (id) => {
        console.log(`removing product "${itemsInCart[id]["name"]}" from cart`);
        delete itemsInCart[id];
        setItemsInCart({...itemsInCart});
    }

    const subtract = () => {
        if (itemsInCart[id]["amount"] === 1) {
            return;
        } else {
            itemsInCart[id]["amount"] -= 1;
        }
        setItemsInCart({...itemsInCart});
    }
    
    const add = () => {
        itemsInCart[id]["amount"] +=  1;
        setItemsInCart({...itemsInCart});
    }
    
    return (
        <div className="productInCart">
            <div>
                <p><span style={{ fontWeight: 'bold' }}>Product name:</span> {itemsInCart[id]["name"]}</p>
                <p><span style={{ fontWeight: 'bold' }}>Product price:</span> {itemsInCart[id]["price"]}$</p>
                <p><span style={{ fontWeight: 'bold' }}>Product amount:</span> {itemsInCart[id]["amount"]}</p>
                <p><span style={{ fontWeight: 'bold' }}>Total price:</span> {Number.parseFloat(itemsInCart[id]["price"] * itemsInCart[id]["amount"]).toFixed(2)}$</p>
            </div>
            <div className="adjustAmountInCart">
                <div className="addSubtractCartContainer">
                    <Button onClick={() => subtract()} text={"-"} />
                    <Button onClick={() => add()} text={"+"} />
                </div>
                <div>
                    <button onClick={() => removeFromCart(id)}>Remove</button>
                </div>
            </div>
        </div>
    )
}