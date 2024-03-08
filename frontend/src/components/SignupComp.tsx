import { SignupType } from '@anukulrthr/common'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { server_url } from '../config'


const SignupComp = () => {
  const navigate = useNavigate();
  const [inputs, setinputs] = useState<SignupType>({
    email:"",
    password:""
  })

  const handleSubmit = async()=>{
    const response = await axios.post(`${server_url}/user/signup`, inputs);
    localStorage.setItem("jwt",response.data.jwt);
    navigate("/blogs")
  }

  return (
    
<div className="bg-grey-lighter min-h-screen flex flex-col h-screen">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>

                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email" 
                        onChange={(e)=>{
                            setinputs({
                                ...inputs,
                                email:e.target.value
                            })
                        }}
                        />

                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password"
                        onChange={(e)=>{
                            setinputs({
                                ...inputs,
                                password:e.target.value
                            })
                        }}
                        />

                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-black text-white hover:bg-black-200 focus:outline-none my-1"
                        onClick={handleSubmit}
                    >Create Account</button>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and 
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                        
                    </div>
                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account? 
                    <Link to="/signin" className="no-underline border-b border-blue text-blue">Log in</Link>
                </div>
            </div>
        </div>
  )
}

export default SignupComp
