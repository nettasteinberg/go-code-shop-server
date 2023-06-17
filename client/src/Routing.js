import React, { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import App from './App';
import { MyContext } from './MyContext';
import AboutPage from './pages/AboutPage/AboutPage';
import AdminPage from './pages/AdminPage/AdminPage';
import CartPage from './pages/CartPage/CartPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import SingleProductPage from './pages/SingleProductPage/SingleProductPage';
import { BASE_URL } from './constants/api';

export const Routing = () => {
  const [categories, setCategories] = useState([]);
  const [filterByValue, setFilterByValue] = useState("All products");
  const [sortByValue, setSortByValue] = useState("Default");
  const [itemsInCart, setItemsInCart] = useState({});
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [highestPrice, setHighestPrice] = useState(1);
  const [value, setValue] = useState([1, highestPrice]);
  const [lowestPriceInRange, setLowestPriceInRange] = useState(1);
  const [highestPriceInRange, setHighestPriceInRange] = useState(highestPrice);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const sortOptions = ["Alphabetically, A-Z", "Alphabetically, Z-A", "Price, low to high", "Price, high to low", "Rating"];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const categories = products.map(p => p.category).filter((value, index, array) => array.indexOf(value) === index);
    setCategories(categories);
    let newHighestPrice = Math.max(...products.map(p => p.price));
    setHighestPrice(newHighestPrice);
    setHighestPriceInRange(newHighestPrice);
    console.log("highest price: ", newHighestPrice);
  }, [products]);

  useEffect(() => {
    setValue([1, highestPrice])
  }, [highestPrice])

  useEffect(() => {
    const loadingSpinner = document.querySelector(".loader-container");
    if (loadingSpinner) {
      loading ? loadingSpinner.style.display = "flex" : loadingSpinner.style.display = "none";
    };
  }, [loading])

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setLoading(false);
      console.log("data", data);
      setProducts(data);
    } catch (e) {
      console.log(e.message);
    }
  }

  const incrementProduct = (setFunc) => {
    setFunc((prev) => prev + 1);
  };

  const decrementProduct = (setFunc, limit) => {
    setFunc((prev) => (prev + limit <= 0 ? prev : prev - 1));
  };

  const addToCart = (id, productName, price, image, amount, setFunc) => {
    if (amount === 0) {
      return;
    }
    if (id in itemsInCart) {
      itemsInCart[id]["amount"] += amount;
    } else {
      itemsInCart[id] = { "name": productName, "amount": amount, "price": price, "image": image };
      console.log(`added item: ${id}`, itemsInCart[id])
    }
    setItemsInCart({ ...itemsInCart });
    setFunc(0);
  }

  const NavUnlisted = styled.ul`

    display: flex;

    a {
      text-decoration: none;
    }

    li {
      color: #dc2f2f;
      margin: 0 0.8rem;
      font-size: 1.3rem;
      position: relative;
      list-style: none;
    }

    .active {
      li {
        border-bottom: 2px solid black;
      }
    }
  `; // Taken from https://dev.to/ridhikgovind/how-to-style-your-react-router-links-using-styled-components-2350

  return (
    <BrowserRouter>
      <MyContext.Provider value={{ fetchProducts, itemsInCart, setFilterByValue, setSortByValue, categories, incrementProduct, decrementProduct, addToCart, products, filterByValue, sortByValue, setItemsInCart, sortOptions, highestPrice, value, setValue, lowestPriceInRange, setLowestPriceInRange, highestPriceInRange, setHighestPriceInRange, isCartOpen, setIsCartOpen }}>
        <NavUnlisted>
          <NavLink to="/" activeClassName="current" exact><li>HomePage</li></NavLink>
          <NavLink to="about" activeClassName="current" exact><li>About</li></NavLink>
          <NavLink to="cart" activeClassName="current" exact><li>Cart</li></NavLink>
          <NavLink to="admin" activeClassName="current" exact><li>Admin</li></NavLink>
        </NavUnlisted>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="product/:id" element={<SingleProductPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
          {/* <Route path="*" element={<Navigate to="/" replace />} />   */}
        </Routes>
      </MyContext.Provider>
    </BrowserRouter>
  );
};

export default Routing;