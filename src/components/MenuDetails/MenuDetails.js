import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Menu from '../Menu/Menu';
import { UserContext } from '../../App';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const MenuDetails = () => {

    const [cart,setCart] = useContext(UserContext)
    const {foodId} = useParams();
    const foodItemDetails = fakeData.find(fd=> fd.id == foodId)
    useEffect(()=>{
        const savedData = getDatabaseCart();
        const itemKey = Object.keys(savedData)
        const savedProduct = fakeData.filter(fd=>fd.id == parseInt(itemKey))
        setCart(savedProduct)
        console.log("ppp",savedProduct)
    },[])
    const handleCartItem = ()=>{
        const newCart = [...cart,foodItemDetails]
        addToDatabaseCart(foodItemDetails.id,1)
        setCart(newCart)
    }
    // const handleIncrease = () =>{
    //     const increase = cart.length + 1
    //    setCart(increase)
    // }
    // const handleDecrease = () =>{
    //     setCart(cart.length - 1)
    // }
    // console.log(cart) 
    return (
        <div>
            <Menu menu = {foodItemDetails}>
               {/* <span onClick = {handleIncrease} className='m-2' >+</span>  */}
               <button onClick={handleCartItem}>Add to Cart</button>
                {/* <span onClick = {handleDecrease} className = 'm-2'>-</span> */}
            </Menu>
        </div>
    );
};

export default MenuDetails;