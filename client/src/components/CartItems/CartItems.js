import React, { useContext } from 'react'
import { MyContext } from '../../MyContext'
import "./CartItems.css"
import { Button } from '../Button/Button';


const CartItems = () => {

  const {itemsInCart, setItemsInCart, setIsCartOpen} = useContext(MyContext);
    
    const removeFromCart = (id) => {
      console.log(id);
        console.log(`removing product "${itemsInCart[id]["name"]}" from cart`);
        delete itemsInCart[id];
        setItemsInCart({...itemsInCart});
    }

    const subtract = (id) => {
      console.log(id);
        if (itemsInCart[id]["amount"] === 1) {
            return;
        } else {
            itemsInCart[id]["amount"] -= 1;
        }
        setItemsInCart({...itemsInCart});
    }
    
    const add = (id) => {
        itemsInCart[id]["amount"] +=  1;
        setItemsInCart({...itemsInCart});
    }

  let totalCost = 0;
  Object.keys(itemsInCart).forEach((key) => {
    totalCost += parseInt(itemsInCart[key]["amount"]) * parseFloat(itemsInCart[key]["price"]);
  });
  return (
    <React.Fragment>
      {Object.keys(itemsInCart).map(id =>
        <div className='itemInCart'>
          <img src={itemsInCart[id]["image"]} alt="product" width={200} height={200} />
          <div className="productProperty">
            <div>Amount:</div>
            <div>{itemsInCart[id]["amount"]}</div>
          </div>
          <div className="productProperty">
            <div>Cost:</div>
            <div>{(itemsInCart[id]["amount"] * itemsInCart[id]["price"]).toFixed(2)}</div>
          </div>
          <div className='changeAmount'>
            <div className="adjustAmountInCart">
              <div className="addSubtractCartContainer">
                <Button onClick={() => subtract(id)} text={"-"} />
                <Button onClick={() => add(id)} text={"+"} />
              </div>
              <div>
                <button onClick={() => removeFromCart(id)}>Remove</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {Object.keys(itemsInCart).length > 0 ? <div className="productProperty itemInCart">
        <div>Total cost:</div>
        <div>
          {totalCost.toFixed(2)}
        </div>
      </div> : setIsCartOpen(false)}
    </React.Fragment>
  )
}

export default CartItems