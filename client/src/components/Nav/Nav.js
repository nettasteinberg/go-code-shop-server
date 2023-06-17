import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import IconButton from '@mui/material/IconButton';
import React, { useContext } from "react";
import { MyContext } from "../../MyContext";
import { sortArrOptions } from '../../dummy-data/data';
import { FilterOrSort } from '../FilterOrSort/FilterOrSort';
import './Nav.css';

export const Nav = () => {
  const { setIsCartOpen, itemsInCart } = useContext(MyContext)

  const setMessage = (message) => {
    const messageDiv = document.querySelector(".messageWhenCartIsEmpty");
    messageDiv.innerHTML = message;
  }

  const handleClickWhenCartItEmpty = () => {
    setMessage('The cart is empty');
    const messageDiv = document.querySelector(".messageWhenCartIsEmpty");
    messageDiv.style.display = "initial";
    setTimeout(() => {
      setMessage('');
      messageDiv.style.display = "none";
    }, 2000); // Clear the message after 3 seconds (3000 milliseconds)
  };

  return (
    <nav className="product-filter">
      <h1>Top Shop</h1>
      <div className="sort">
        <div className="openCartButton">
          <IconButton onClick={() => { Object.keys(itemsInCart).length > 0 ? setIsCartOpen(true) : handleClickWhenCartItEmpty()}}>
            <div class="messageWhenCartIsEmpty"></div>
            <ShoppingCartTwoToneIcon color="primary" aria-label="shopping cart" fontSize='large' />
          </IconButton>
        </div>
        <FilterOrSort label={"Filter"} />
        <FilterOrSort label={"Sort"} optionsArr={sortArrOptions} />
      </div>
    </nav>
  );
};