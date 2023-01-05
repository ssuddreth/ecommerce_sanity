import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();
const initialState = [];

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState(initialState);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    useEffect(() => {
        const cartData = JSON.parse(sessionStorage.getItem("cartItems"));
        if (cartData) {
            setCartItems(cartData);
            let total = 0;
            let totalPriceFromStorage = 0;
            for (let i = 0; i < cartData.length; i++) {
                total += cartData[i].quantity;
                totalPriceFromStorage += cartData[i].price * cartData[i].quantity;
            }
            setTotalQuantities(total);
            setTotalPrice(totalPriceFromStorage);
        }
    }, []);

    useEffect(() => {
        if (cartItems !== initialState) {
            sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
    }, [cartItems]);

    const onAdd = (product, quantity, size) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        product.selectedSize = size;

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }

        toast.success(`${qty} ${product.name} added to your bag.`, {duration: 900});
        console.log(product);
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemQuanitity = (id, value) => {
        const newCartItems = [...cartItems];
        foundProduct = newCartItems.find((item) => item._id === id)
        index = newCartItems.findIndex((product) => product._id === id);
        //const newCartItems = cartItems.filter((item) => item._id !== id)

        if (value === 'inc') {
            foundProduct.quantity += 1;
            newCartItems[index] = foundProduct;
            setCartItems(newCartItems);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                foundProduct.quantity -= 1;
                newCartItems[index] = foundProduct;
                setCartItems(newCartItems);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
            }
        }
    }

    const setQuantity = () => {
        setQty(1);
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;

            return prevQty - 1;
        });
    }

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                setQuantity,
                onAdd,
                toggleCartItemQuanitity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantities
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);