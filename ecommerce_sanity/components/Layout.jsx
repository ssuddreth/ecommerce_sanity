import React, { isValidElement } from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';

import { useStateContext } from '../context/StateContext';
import Cart from './Cart';

const Layout = ({ children }) => {
  const { showCart, setShowCart } = useStateContext();
  return (
    <div className="layout" onClick={() => {
      if (showCart && event.target.className == 'cart-wrapper') {
        setShowCart(false);
      } 
    }}>
      <Head>
        <title>FUF Merch Shop</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout