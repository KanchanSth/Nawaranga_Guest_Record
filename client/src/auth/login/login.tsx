import  { useState , useRef, useEffect} from 'react'
import type { KeyboardEvent, RefObject } from 'react'
import axios from 'axios'
import {Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import type {LoginModel} from "./loginModel"
const LogIn = () => {
    const loginModel: LoginModel = {
        email: "",
        password: "",
        
      };

     
      const passwordRef = useRef<HTMLInputElement>(null);
      const emailRef = useRef<HTMLInputElement>(null);
     

      
      useEffect(() => {
        emailRef.current?.focus(); 
      }, []);
      interface FormFieldErrors {
        
        password?: string;
        email?: string;
      
      }
          const [userInfo, setUserInfo] = useState(loginModel);
          const navigate = useNavigate();
      
      
      
      const [errors, setErrors] = useState<FormFieldErrors>({});
      
      const validate = (): boolean => {
        const tempErrors: FormFieldErrors = {};
      
      
        if (!userInfo.email.trim()) tempErrors.email = "Email is required";
        if (!userInfo.password.trim()) tempErrors.password = "Password is required";
    
      
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!userInfo.email.trim()) {
          tempErrors.email = "Email is required";
        } else if (!emailRegex.test(userInfo.email)) {
          tempErrors.email = "Invalid email format";
        }
      
        setErrors(tempErrors);
      
        return Object.keys(tempErrors).length === 0;
      };
      
      
      const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
        setUserInfo({ ...userInfo, [name]: value });
        
       
        const tempErrors = { ...errors };
        
        if (name === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          
          if (!value.trim()) {
            
            tempErrors.email = "Email is required";
          } else if (!emailRegex.test(value)) {
           
            tempErrors.email = "Please enter a valid email";
          } else {
           
            delete tempErrors.email;
          }
        } else if (value.trim()) {
          delete tempErrors[name as keyof FormFieldErrors];
        }
        
        setErrors(tempErrors);
      };
      
      
      
      const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        if (!validate()) return;
      
        try {
          const res = await axios.post("http://localhost:8000/api/auth/login", userInfo);
          toast.success(res.data.message, { position: "top-right" });
          localStorage.setItem("token", res.data.token);

          console.log("Login successfully!");
          window.location.href = "/";
         // navigate("/",{ replace: true });
        } catch (error) {
          console.log(error);
           toast.error("Something went wrong!", { position: "top-right" });
        }
      };
       
      
      const handleEnterPress = (
        e: KeyboardEvent<HTMLInputElement>,
        nextRef?: RefObject<HTMLInputElement | null>,
        isLast: boolean = false
      ) => {
        if (e.key === "Enter") {
          e.preventDefault();
      
          if (isLast) {
          
            document.querySelector<HTMLFormElement>(".loginForm")?.requestSubmit();
            return;
          }
      
          
          nextRef?.current?.focus();
        }
      };
      
  return (
    <div className='formContainer'>
        <h3 className='text-center text-4xl text-violet-800 mx-auto '> Welcome </h3>

        <div className="flex items-center justify-center gap-2 mt-6">
          <p className="text-lg text-violet-800 m-0">
            Don't have an account?
          </p>
        
          <Link
            to="/registeration"
            className="inline text-lg font-semibold text-violet-600 hover:text-violet-800 hover:underline p-0 m-0"
          >
            Sign Up
          </Link>
        </div>
        
        <form action="" className="loginForm" onSubmit={submitForm}>
         

             <div className="inputGroup">
                    
                <label className='label' >E-mail</label>
                <input   ref={emailRef}
       onKeyDown={(e) => handleEnterPress(e, passwordRef)} className='inputField' type="text" onChange={inputHandler} id='email' name='email' autoComplete='off' placeholder='Enter email' />
           {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
             </div>

              <div className="inputGroup">
                <label className='label'>Password</label>
                <input  ref={passwordRef}
       onKeyDown={(e) => handleEnterPress(e, undefined, true)} className='inputField' type="text" onChange={inputHandler} id='password' name='password' autoComplete='off' placeholder='Enter Password' />
       {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
      
             </div>
            
            <div className="inputGroup">
                <button type="submit" className="save">Login</button>
            </div>
        </form>
        </div>
      )
}

export default LogIn
