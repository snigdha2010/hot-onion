import React, { useEffect, useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import Menu from '../Menu/Menu';
import { UserContext } from '../../App';

const Home = () => {

    const { value, value2 } = useContext(UserContext);
    const [cart, setCart] = value;
    const menus = fakeData; 
    const [ menu, setMenu ] = useState('lunch');
    const currentMenu =  menus.filter(mn => mn.category === menu);
    const handleMenu = (menu)=>{
        setMenu(menu)
    }
    
    return (
        <div>
            <button onClick={()=>handleMenu('lunch')}>Lunch</button>
            <button onClick={()=>handleMenu('dinner')}>Dinner</button>
            <button onClick={()=>handleMenu('breakfast')}>BreakFast</button>
            {currentMenu.map(menu=><Menu 
            key = {menu.id}
            menu = {menu}
            ></Menu>)}

            <Link to = '/shipment'><button disabled={!cart.length>0} >Place Order</button>
        
            </Link></div>
    );
};

export default Home;