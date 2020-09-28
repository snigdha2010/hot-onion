import React, { useContext, useState, useEffect } from 'react';
import { UserContext, LogInContext } from '../../App';
import { getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';

const Header = () => {
    const { value, value2 } = useContext(UserContext);
    const [cart, setCart] = value
    const [logedIn , setLogedIn ] = value2;
    console.log(logedIn)
    
    useEffect(()=>{
        const savedData = getDatabaseCart();
        const itemKey = Object.keys(savedData)
        const savedProduct = fakeData.filter(fd=>fd.id == parseInt(itemKey))
        setCart(savedProduct)
    },[])
    
        return (
        <div>
            <h1 className='text-center'>cart:{cart.length}</h1>
            <button onClick={()=>setLogedIn({})}>Sign Out</button>
        </div>
    );
};

export default Header;