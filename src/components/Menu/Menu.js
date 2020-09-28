import React from 'react';
import { Link } from 'react-router-dom';

const Menu = (props) => {
    const{name,price,detail,id} = props.menu
    //console.log(props)
    return (
        <div>
            <img src="" alt=""/>
            <Link to = {`/food/${id}`}  ><p>Name: {name}</p></Link>
            <p>{detail}</p>  
            <p>Price:{price}</p>
            {props.children}
        </div>
    );
};

export default Menu;