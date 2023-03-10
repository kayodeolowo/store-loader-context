import React, { createContext, useState, useEffect } from "react";
 import axios from 'axios'




export const DataContext = createContext();

export const DataProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)
  

   const url = `https://fakestoreapi.com/products`

  // useEffect(()=>{
  //   axios.get(url).then((response)=>{
  //     setProducts(response.data)
  //     console.log(response.data)
  //   })
  // },[url])

  const showProducts = async() => {
    try {
      const data = await axios 
      .get(url)
      .then(res=> {
        setProducts(res.data)
        console.log(res.data)
      });
      setLoading(true);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(()=> {
    showProducts();
  }, []);
  

  const [cart, setCart] = useState([]);
  const addToCart = (id) => {
    const isNotInCart = cart.every((item) => item.id !== id);
    if (isNotInCart) {
      const foundProduct = products.filter((item) => item.id === id);
      setCart([...cart, ...foundProduct]);
    } else {
      alert("Bond is already in cart");
    }
  };

  useEffect(() => {
    const dataInCart = JSON.parse(localStorage.getItem("dataInCart"));
    if (dataInCart) {
      //setCart(dataInCart);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("dataInCart", JSON.stringify(cart));
  }, [cart]);

  const value = {
    products: [products, setProducts],
    loading: [loading, setLoading],
    cart: [cart, setCart],
    addToCart: addToCart,
  };

  return (
    <DataContext.Provider value={value}>
      {props.children}
    </DataContext.Provider>
  );
};
