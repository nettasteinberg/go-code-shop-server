import React, { useContext } from 'react'
import { MyContext } from '../../MyContext'
import "./CartItems.css"

const CartItems = () => {

  const {itemsInCart, setItemsInCart, setIsCartOpen} = useContext(MyContext);
    
    const removeFromCart = (id) => {
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

    const clearCart = () => {
      for (const id in itemsInCart) {
        delete itemsInCart[id];
      }
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
                <button className='addSubtractButton minus' onClick={() => subtract(id)}>-</button>
                <button className='addSubtractButton plus' onClick={() => add(id)}>+</button>
              </div>
              <div>
                <button className='remove' onClick={() => removeFromCart(id)}>Remove</button>
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
      <button className='remove' onClick={() => clearCart()}>Clear cart</button>
    </React.Fragment>
  )
}

export default CartItems