import { createContext, useEffect, useState } from "react";
import axios from 'axios';
export const StoreContext =createContext(null)

const StoreContextProvider =(props)=>{

    const url="https://food-del-app-backend-e9d2.onrender.com";
    const [cartItems,setCartItems] =useState({});
    const [food_list,setFoodList] =useState([])
    const addToCart =(itemId)=>{
        if(!cartItems[itemId])
        {
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    const fetchFoodList =async()=>{
        const response =await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
    }
    useEffect(()=>{

        async function loadData(){
            await fetchFoodList()
        }
        loadData();
    })

    const removeFromCart =(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

   const getTotalCartAmount=()=>{
    let totalAmount=0;
    for(const item in cartItems)
    {
        if(cartItems[item]>0){
            let itemInfo=food_list.find((Product)=>Product._id === item)
            totalAmount +=itemInfo.price*cartItems[item];
        }
    }
    return totalAmount;
   }


    const contextValue ={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
