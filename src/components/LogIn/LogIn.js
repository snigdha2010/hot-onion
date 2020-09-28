import React, { useState, useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);
const LogIn = () => { 


    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const { value, value2 } = useContext(UserContext);
    const [logedIn , setLogedIn ] = value2;
     const [signUpUser,setSignedUser ] = useState(true)
     const [user,setUser] = useState({
            isLogedin:false, 
            name: '',
            email:'',
            password1:'',
            password2:''
        })  
    let isValid = true; 
    const getInputValue = (e) =>{
      
       // console.log(e.target.name,e.target.value)
        
        if(e.target.name == 'email'){
            isValid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(e.target.value)   
        }
        if(e.target.name == 'password1' || e.target.name == 'password2' ){
            const validLength = (e.target.value).length>5
            const hasNumber = /\d{1}/.test(e.target.value)
             isValid = validLength && hasNumber  
             console.log(hasNumber)
        }
        
        if(isValid){
            const userinfo = {...user};
            userinfo[e.target.name] = e.target.value;
            setUser(userinfo);
        }
        
    }
    const handleSubmitForm = (e)=>{
        if(signUpUser && user.password1 != user.password2){
            alert('password not match!!')
        }
        if(signUpUser && user.password1 == user.password2 && isValid){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password1)
            .then(res=>{
                console.log("signed up!")
                const newUserInfo = {
                    ...user,
                    error : ''
                }
                setUser(newUserInfo);
                setLogedIn(newUserInfo);
                history.replace(from);
                var updateuser = firebase.auth().currentUser;

                    updateuser.updateProfile({
                    displayName: user.name
                    }).then(function() {
                    console.log('name updated')
                    }).catch(function(error) {
                    // An error happened.
                    });

            })
            .catch(function(err) {
                const newUserInfo = {...user,
                    error: err.message
                }
                setUser(newUserInfo)
              });
        }
        if(!signUpUser){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password1)
            .then(res=>{
                console.log('Signed In', res.user.displayName)
                const newUserInfo = {
                    ...user,
                    error : ''
                }
                setUser(newUserInfo);
                setLogedIn(newUserInfo);
                history.replace(from);
            })
            .catch(function(err) {
                const newUserInfo = {...user,
                    error: err.message
                }
                setUser(newUserInfo)
              });

        }
       
       e.preventDefault();
       console.log(user)
    }
    const handleSignIn = ()=>{
        console.log('clicked',signUpUser)
        setSignedUser(!signUpUser)

    }
    return (
        <div className='text-center'>
            <form onSubmit={handleSubmitForm}>
               { signUpUser && <input onBlur={getInputValue} className='w-50 m-2' type="text" name="name" placeholder='Your name'/>
              }  <br/>
                <input onBlur={getInputValue} className='w-50 m-2' type="email" name="email" placeholder='Your email' required/>
                <br/>
                <input onBlur={getInputValue} className='w-50 m-2' type="password" name="password1" placeholder='Your password' required/>
                <br/>
               { signUpUser && <input onBlur={getInputValue} className='w-50 m-2' type="password" name="password2" placeholder='Confirm Your password'required/>
               } <br/>
                <input className='w-50 m-2'  type='submit' value='Sign in'/>
            </form>
            <p onClick={handleSignIn}> {signUpUser? 'Already have an account?': 'New Sign Up User?'}</p>
            <p style={{color:'red'}}>{user.error}</p>
            
        </div>
    );
};

export default LogIn;