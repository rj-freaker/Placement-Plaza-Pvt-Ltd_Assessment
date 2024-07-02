import React, { useState } from 'react';
import { CiUser } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { FaLock } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import './Signup.css';
import axios from 'axios';
import {toast} from 'react-toastify';

export default function Signup() {
    const [visible,setVisible] = useState(false);
    const [formData, setformdata] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    function visibleHandler(){
        setVisible(!visible);
    }
    function handleFormData(e){
        setformdata((pre) => ({
            ...pre,
            [e.target.name] : e.target.value
        }))
    }

    async function handleSubmit(e){
        e.preventDefault();
        if(formData.confirmPassword !== formData.password){
            toast.error("Password is not matching", {
                position: 'top-right'
            })
            return;
        }

        try{
            const response = await axios.post('/api/user/signup', formData);
            console.log(response);
            if(response.status == 200 && response.statusText == 'OK'){
                toast.success("Signup successful", {
                    position: 'top-right'
                })
                setformdata({
                    fullName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                })  
            }
        }
        catch (error) {
            console.error('Error in signup:', error);
        }
    } 
  return (
    <div className='mainDivSignup'>

        <div className='mainFormDiv'>
            <form className='signUpform' onSubmit={handleSubmit}>
                <h2 className='formTitle'>Signup</h2>
                <div className='nestedDivForm'>
                    <span className='iconStyle1'><CiUser/></span>
                    <input type='text' name='fullName' value={formData.fullName} onChange={handleFormData} placeholder='Full Name'/>
                </div>
                <div className='nestedDivForm'>
                    <span className='iconStyle1'><AiOutlineMail/></span>
                    <input type='text' name='email' value={formData.email} onChange={handleFormData} placeholder='Email ID'/>
                </div>
                <div className='nestedDivForm'>
                    <span className='iconStyle1'><FaLock/></span>
                    <input type={visible ? 'text' : 'password'} name='password' value={formData.password} onChange={handleFormData} placeholder='Create a Password'/>
                </div>
                <div className='nestedDivForm'>
                    
                    <input type={visible ? 'text' : 'password'} placeholder='Confirm Password' name='confirmPassword' value={formData.confirmPassword} onChange={handleFormData}/>
                    <span className='iconStyle' onClick={visibleHandler}>
                        {
                            visible ? <IoEyeOff/> : <IoEye/>
                        }
                    </span>
                </div>

                <div className='nestedDivForm'>
                    <button>Signup</button>
                </div>
                <div>
                    <span>Already have an account? <a href='#'>Signin</a></span>
                </div>
            </form>
        </div>
    </div>
  )
}
