import React, { useContext, useState } from 'react'
import { MyContext } from '../../MyContext';
import "./AddToCartButtons.css"

const AddToCartButtons = ({ id, title, price, image}) => {
    const { incrementProduct, decrementProduct, addToCart, itemsInCart, setItemsInCart } = useContext(MyContext);
    const [count, setCount] = useState(0);

    const removeFromCart = (id) => {
        if (!(id in itemsInCart)) {
            return;
        }
        console.log(`Removing product "${itemsInCart[id]["name"]}" from the cart`);
        delete itemsInCart[id];
        setItemsInCart({...itemsInCart});
    }

    return (
        <React.Fragment>
            <div className="buttonsClassAddToCartButtons">
                <div className='changAmount'>
                    <button className='minus' onClick={() => decrementProduct(setCount, id in itemsInCart ? itemsInCart[id]["amount"] : 0)}>-</button>
                    <p>{count}</p>
                    <button className='plus' onClick={() => incrementProduct(setCount)}>+</button>
                </div>
                <div className="addToCart">
                    <button className="button add" onClick={() => {addToCart(id, title, price, image, count, setCount); setItemsInCart({...itemsInCart});}}> {count >= 0 ? "Add to cart" : "Subtract from cart"} </button>
                </div>
                <div className="removeFromCart">
                    <button className="button remove" onClick={() => {removeFromCart(id)}}>Remove from cart</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AddToCartButtons