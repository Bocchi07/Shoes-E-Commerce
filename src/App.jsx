import react, { useState, useEffect, createContext} from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import './App.css'
import Home from "./components/Home.jsx"
import Page from "./components/Page.jsx"
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import SignupForm from "./components/Registration Form/SignupForm.jsx"
import LoginForm from "./components/Registration Form/LoginForm.jsx"
import UserAccount from "./components/User Account/UserAccount.jsx"
import ProductView from "./components/Products/ProductView.jsx";
import Checkout from "./components/Checkout/Checkout.jsx"
import Cart from "./components/Cart/Cart.jsx"
import RemoveCart from "./components/Cart/RemoveCart.jsx"
import RemoveAllCart from "./components/Cart/RemoveAllCart.jsx"
import Men from "./components/Page/Men.jsx";
import Women from "./components/Page/Women.jsx";
import Kids from "./components/Page/Kids.jsx";
import Unisex from "./components/Page/Unisex.jsx";
import PurchaseMessage from "./components/Checkout/PurchaseMessage.jsx";

export const CartContext = createContext();
export const AddressContext = createContext();

function App() {
  const [cartIsActive, setCartActive] = useState(false);
  const [newCart, setNewCart] = useState([]);
  const [regularPrice, setRegularPrice] = useState();
  const [addQuantity, setAddQuantity] = useState(1);
  const [cartsTotalPrice, setCartsTotalPrice] = useState([])
  const [isGenderActive, setIsGenderActive] = useState(false);

  const [deleteItemIsActive, setDeleteItemIsActive] = useState(false);
  const [deleteAllItemIsActive, setDeleteAllItemIsActive] = useState(false);
  const [cartItemIsRemove, setCartItemIsRemove] = useState()
  const [countCartItem, setCountCartItem] = useState(1);
  const [cartQuantity, setCartQuantity] = useState(1)
  const [checkOutTotalPrice, setCheckOutTotalPrice] = useState()
  const [checkoutItem, setCheckOutItem] = useState(() => {
    const checkoutItemData = window.localStorage.getItem("checkoutItemStorage");

    return checkoutItemData ? JSON.parse(checkoutItemData) : [];
  });

  const [isCartEmpty, setIsCartEmpty] = useState(false)
  const [hasUserAccount, setHasUserAccount] = useState(false)

  const [loginSuccessfully, setLoginSuccessfully] = useState(() => {
    const loginStorage = window.localStorage.getItem("loginStorage");
    return loginStorage ? JSON.parse(loginStorage) : false;
  })

  const [productData, setProductData] =  useState(() => {
    const productDataStorage = window.localStorage.getItem("viewProductStorage");
    return productDataStorage
      ? JSON.parse(productDataStorage)
      : []
  });

  const [cart, setCart] = useState(() => {
      const savedCart = window.localStorage.getItem('cartStorage');
      return savedCart ? JSON.parse(savedCart) : [];
  });

  const [adress, setAddress] = useState();
  const [clientAddressInfo, setClientAddressInfo] = useState(() => {
    const clientAddressData = window.localStorage.getItem("clientAddressStorage")

    return clientAddressData
       ? JSON.parse(clientAddressData)
       : {
            fullName: '',
            mobileNumber: '',
            notes: '',
            houseAddress: '',
            province: '',
            municipality: '',
            barangay: '',
            labelAddress: "HOME"
         }
  });

  const [signupFormData, setSignupFormData] = useState(() => {
    const signUpStorage = window.localStorage.getItem('signUpStorage');
    return signUpStorage ? JSON.parse(signUpStorage) : [];
  })

  const [personalInfo, setPersonalInfo] = useState(() => {
    const savedInfo = window.localStorage.getItem('usersInfoStorage');
    return savedInfo ? JSON.parse(savedInfo) : {
      fullName: "",
      birthday: "",
      gender: "",
      phoneNumber: "",
      email: ""
    }
  })

  useEffect(() => {
    setHasUserAccount(prev => signupFormData.length >= 1 ? true : false)
  })

  useEffect(() => {
    window.localStorage.setItem("checkoutItemStorage", JSON.stringify(checkoutItem))
  }, [checkoutItem])

  useEffect(() => {
    window.localStorage.setItem("clientAddressStorage", JSON.stringify(clientAddressInfo))
    console.log("Saving client Address to localStorage:", clientAddressInfo)
  }, [clientAddressInfo])

  useEffect(() => {
    window.localStorage.setItem("loginStorage", loginSuccessfully)
  }, [loginSuccessfully])

  useEffect(() => {
    window.localStorage.setItem("signUpStorage", JSON.stringify(signupFormData))
  }, [signupFormData])

  useEffect(() => {
    window.localStorage.setItem("usersInfoStorage", JSON.stringify(personalInfo))
    console.log(personalInfo)
  }, [personalInfo])

  useEffect(() => {
    console.log("Saving cart to localStorage:", cart);
    window.localStorage.setItem("cartStorage", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    cart.length == 0 ? setIsCartEmpty(true) : setIsCartEmpty(false)
  }, [cart])

  useEffect(() => {
    window.localStorage.setItem("viewProductStorage", JSON.stringify(productData));
  }, [productData])

  const handleProductView = async(product) => {
    await setProductData(product)
  }

  const handleCartIsActive = () => {
      setCartActive(c => !c);
  }

  const handleCart = (data) => {
    handleCartIsActive();

    if(cart.some(i => i.id == data.id && i.size == data.size)){
      data.quantity += 1
      data.price += data.regularPrice
      return
    }

    setCart(prevCart => [...prevCart, data]);
    setCart(c => c.reverse());
  }

  const handleRemoveCart = () => {
    setCart(prevCart =>
      prevCart.filter(item =>
        item.size !== cartItemIsRemove.size || item.id !== cartItemIsRemove.id
      )
    );

    handleDeleteVerification()
  };

  const handleDeleteVerification = (data) => {
    setDeleteItemIsActive(prevCon => !prevCon ? true : false)

    setCartItemIsRemove(data)
  }

  const handleDeleteAllVerification = (data) => {
    setDeleteAllItemIsActive(prevCon => !prevCon ? true : false)
    setCartItemIsRemove(data)
  }

  const handleClearCart = (data) => {
    setCart([])
    handleDeleteAllVerification()
  }

  const handleIncPrice = (param1, param2) => {
      setCartsTotalPrice(prevPrice => [...prevPrice, param2])
  }


  return (
    <div className="relative font-arial">
      <Header
        handleCart={handleCartIsActive}
        cart={cart}
        signupFormData={signupFormData}
        isGenderActive={isGenderActive}
        setIsGenderActive={setIsGenderActive}
        loginSuccessfully={loginSuccessfully}
      />

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/purchase-successfull" element={<PurchaseMessage setCart={setCart} checkoutItem={checkoutItem} setCheckOutItem={setCheckOutItem}/>}/>
        <Route path="/men" element={<Men viewProduct= {handleProductView} />} />
        <Route path="/women" element={<Women viewProduct= {handleProductView}/>} />
        <Route path="/kids" element={<Kids viewProduct= {handleProductView}/>} />

        <Route path="/unisex" element={<Unisex viewProduct= {handleProductView}/>} />

        <Route path="/signup-form" element ={<SignupForm
                                                setSignupFormData={setSignupFormData}
                                                signupFormData={signupFormData}
                                            />} />

        <Route path="/login-form" element ={<LoginForm
                                                setSignupFormData={setSignupFormData}
                                                signupFormData={signupFormData}
                                                loginSuccessfully={loginSuccessfully}
                                                setLoginSuccessfully={setLoginSuccessfully}
                                            />} />

        <Route path="/userAccount" element ={<UserAccount
                                                adress={adress}
                                                setSignupFormData={setSignupFormData}
                                                setAddress={setAddress}
                                                clientAddressInfo={clientAddressInfo}
                                                setClientAddressInfo={setClientAddressInfo}
                                                setPersonalInfo={setPersonalInfo}
                                                personalInfo={personalInfo}
                                                signupFormData={signupFormData}
                                              />}/>

        <Route path="/view-product" element = {<ProductView
              product={productData}
              handleCart={handleCart}
              handleCartIsActive={handleCartIsActive}
              handleIncPrice={handleIncPrice}
              />}
              />
        <Route path="/checkout"
              element={<Checkout
              cart={cart}
              setCart={setCart}
              totalPrice={checkOutTotalPrice}
              handleCartIsActive={handleCartIsActive}
              setClientAddressInfo={setClientAddressInfo}
              clientAddressInfo={clientAddressInfo}
              setAddress ={setAddress}
              adress={adress}
              checkoutItem={checkoutItem}
              setCheckOutItem={setCheckOutItem}
              />}/>

      </Routes>

      <CartContext.Provider value={{cart, setCart, setNewCart, setCheckOutTotalPrice, hasUserAccount, isCartEmpty}}>
        <Cart
          handleRemoveCart={handleRemoveCart}
          handleCart={handleCart}
          cartIsActive={cartIsActive}
          handleCartIsActive={handleCartIsActive}
          addQuantity={addQuantity}
          regularPrice={regularPrice}
          handleClearCart={handleClearCart}
          handleDeleteVerification={handleDeleteVerification}
          handleDeleteAllVerification ={handleDeleteAllVerification}
          handleIncPrice={handleIncPrice}
          cart={cart}
          deleteItemIsActive={deleteItemIsActive}
          deleteAllItemIsActive={deleteAllItemIsActive}
        />
      </CartContext.Provider >

      <div className= {`fixed ${cartIsActive ? 'block opacity-30' : 'hidden opacity-0'} ${deleteItemIsActive || deleteAllItemIsActive? 'z-10' : 'z-10'} transition-all ease-in-out duration-200 bg-black top-0 left-0 w-full h-full`}></div>

      <Footer />
    </div>
  )
}

export default App
