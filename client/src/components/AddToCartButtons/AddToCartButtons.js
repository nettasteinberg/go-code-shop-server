import React, { useContext, useState } from 'react'
import { MyContext } from '../../MyContext';
import { Button } from '../Button/Button';
import "./AddToCartButtons.css"

const AddToCartButtons = ({ id, title, price, image}) => {
    const { incrementProduct, decrementProduct, addToCart, itemsInCart, setItemsInCart } = useContext(MyContext);
    const [count, setCount] = useState(0);

    return (
        <React.Fragment>
            <div className="buttons">
                <div className='changAmount'>
                    <Button onClick={() => decrementProduct(setCount, id in itemsInCart ? itemsInCart[id]["amount"] : 0)} text={"-"} />
                    <p>{count}</p>
                    <Button onClick={() => incrementProduct(setCount)} text={"+"} />
                </div>
                <div className="addToCart">
                    <Button className="addButton" onClick={() => {addToCart(id, title, price, image, count, setCount); setItemsInCart({...itemsInCart});}} text={count >= 0 ? "Add to cart" : "Subtract from cart"} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default AddToCartButtons