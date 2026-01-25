import  { useState , useRef, useEffect} from 'react'
import axios from 'axios'
import {Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import type {RegisterationModel} from "./registerationModel"
import RoleDropdown from "../components/roleDropDown";

const Registeration = () => {
    const registerationModel: RegisterationModel = {
        
        name: "",
        email: "",
        password: "",
        role: "user",
        
      };

      const nameRef = useRef<HTMLInputElement>(null);
      const passwordRef = useRef<HTMLInputElement>(null);
      const emailRef = useRef<HTMLInputElement>(null);
      const roleRef = useRef<HTMLSelectElement>(null);

      
      useEffect(() => {
        nameRef.current?.focus(); 
      }, []);
      interface FormFieldErrors {
        name?: string;
        password?: string;
        email?: string;
        role?: string;
      }
          const [userInfo, setUserInfo] = useState(registerationModel);
          const navigate = useNavigate();
      
      
      
      const [errors, setErrors] = useState<FormFieldErrors>({});
      
      const validate = (): boolean => {
        const tempErrors: FormFieldErrors = {};
      
        if (!userInfo.name.trim()) tempErrors.name = "User name is required";
        if (!userInfo.email.trim()) tempErrors.email = "Email is required";
        if (!userInfo.password.trim()) tempErrors.password = "Password is required";
        if (!userInfo.role.trim()) tempErrors.role = "Role selection is required";
      
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
          const res = await axios.post("http://localhost:8000/api/auth/register", userInfo);
          toast.success(res.data.message, { position: "top-right" });
          console.log("User registered successfully!");
          navigate("/login");
        } catch (error) {
          console.log(error);
           toast.error("Something went wrong!", { position: "top-right" });
        }
      };
       
      const handleEnterPress = (
  e: React.KeyboardEvent<HTMLElement>,
  nextRef?: React.RefObject<HTMLElement | null>,
  isLast: boolean = false
) => {
  if (e.key === "Enter") {
    e.preventDefault();

    if (isLast) {
      document
        .querySelector<HTMLFormElement>(".registerUserForm")
        ?.requestSubmit();
      return;
    }

    nextRef?.current?.focus();
  }
};


      
      
  return (
    <div className='formContainer'>
        <h3 className='text-center text-4xl text-violet-800 mx-auto my-2 '> Register Your Account 
    </h3>
    <div className="flex items-center justify-center gap-2 mt-6">
  <p className="text-lg text-violet-800 m-0">
    Already have an account?
  </p>

  <Link
    to="/login"
    className="inline text-lg font-semibold text-violet-600 hover:text-violet-800 hover:underline p-0 m-0"
  >
    Log in
  </Link>
</div>

        <form action="" className="registerUserForm" onSubmit={submitForm}>
         <div className="inputGroup">
                <label className='label' >Name</label>
                <input   ref={nameRef}
       onKeyDown={(e) => handleEnterPress(e, emailRef)} className='inputField' type="text" onChange={inputHandler} id='name' name='name' autoComplete='off' placeholder='Enter name' />
           {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
             </div>

             <div className="inputGroup">
                    
                <label className='label' >E-mail</label>
                <input   ref={emailRef}
       onKeyDown={(e) => handleEnterPress(e, passwordRef)} className='inputField' type="text" onChange={inputHandler} id='email' name='email' autoComplete='off' placeholder='Enter email' />
           {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
             </div>

              <div className="inputGroup">
                <label className='label'>Password</label>
                <input  ref={passwordRef}
       onKeyDown={(e) => handleEnterPress(e, roleRef)} className='inputField' type="text" onChange={inputHandler} id='password' name='password' autoComplete='off' placeholder='Enter Password' />
       {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
      
             </div>
             

             <div className="inputGroup">
  <label className="label">Role</label>

  <RoleDropdown
    value={userInfo.role}
    onChange={(role) =>
      setUserInfo((prev: RegisterationModel) => ({
        ...prev,
        role,
      }))
    }
    onKeyDown={(e) => handleEnterPress(e, undefined, true)}
  />

  {errors.role && (
    <p className="text-red-600 text-sm">{errors.role}</p>
  )}
</div>



            <div className="inputGroup">
                <button type="submit" className="save">Sign Up</button>
            </div>
        </form>
        </div>
      )
}

export default Registeration
