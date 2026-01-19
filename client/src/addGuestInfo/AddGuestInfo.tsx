import  { useState , useRef, useEffect} from 'react'
import type { KeyboardEvent, RefObject } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import type {GuestInfoModel} from "../getGuestInfo/getGuestInfoModel"
import { IoIosArrowBack } from "react-icons/io";


const AddGuestInfo = () => {


  const guestDataModel: GuestInfoModel = {
    room_no:"",
    passport_no: "",
    name: "",
    email: "",
    address: "",
    purpose_of_visit: ""
  };
  const roomRef = useRef<HTMLInputElement>(null);
const passportRef = useRef<HTMLInputElement>(null);
const nameRef = useRef<HTMLInputElement>(null);
const emailRef = useRef<HTMLInputElement>(null);
const addressRef = useRef<HTMLInputElement>(null);
const visitPurposeRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  roomRef.current?.focus(); 
}, []);
interface GuestErrors {
  room_no?: string;
  passport_no?: string;
  name?: string;
  email?: string;
  address?: string;
}
    const [guestInfo, setGuestInfo] = useState(guestDataModel);
    const navigate = useNavigate();



const [errors, setErrors] = useState<GuestErrors>({});

const validate = (): boolean => {
  const tempErrors: GuestErrors = {};

  if (!guestInfo.room_no.trim()) tempErrors.room_no = "Room number is required";
  if (!guestInfo.passport_no.trim()) tempErrors.passport_no = "Passport number is required";
  if (!guestInfo.name.trim()) tempErrors.name = "Name is required";
  if (!guestInfo.address.trim()) tempErrors.address = "Address is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!guestInfo.email.trim()) {
    tempErrors.email = "Email is required";
  } else if (!emailRegex.test(guestInfo.email)) {
    tempErrors.email = "Invalid email format";
  }

  setErrors(tempErrors);

  return Object.keys(tempErrors).length === 0;
};


const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  console.log(name, value);
  setGuestInfo({ ...guestInfo, [name]: value });
  
 
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
    delete tempErrors[name as keyof GuestErrors];
  }
  
  setErrors(tempErrors);
};



const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    const res = await axios.post("http://localhost:8000/api/guestInfo", guestInfo);
    toast.success(res.data.message, { position: "top-right" });
    console.log("Guest data added successfully!");
    navigate("/");
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
    
      document.querySelector<HTMLFormElement>(".addGuestForm")?.requestSubmit();
      return;
    }

    
    nextRef?.current?.focus();
  }
};





  return (
    <div className='formContainer'>
<Link to="/" type="button" className="flex gap-2 mx-2 my-2 text-center border border-violet-600 justify-center md:text-[15px] hover:text-violet-800 rounded-xs  px-4  w-20 font-header  text-violet-950  py-3 bg-violet   cursor-pointer  "> <IoIosArrowBack className="text-2xl" /> Back</Link>
    <h3 className='text-center text-4xl text-violet-800 mx-auto '>Add Guest </h3>
    <form action="" className="addGuestForm" onSubmit={submitForm}>
        <div className="inputGroup">
            <label className='label' >Room No </label>
            <input
  ref={roomRef}
   onKeyDown={(e) => handleEnterPress(e, passportRef)}
  name="room_no"
  placeholder="Enter room number"
  onChange={inputHandler}
 
  className="inputField"
/>
 {errors.room_no && <p className="text-red-600 text-sm">{errors.room_no}</p>}
         </div>
          <div className="inputGroup">
            <label className='label'>Passport No</label>
            <input  ref={passportRef}
   onKeyDown={(e) => handleEnterPress(e, nameRef)} className='inputField' type="text" onChange={inputHandler} id='passport_no' name='passport_no' autoComplete='off' placeholder='Enter passport number' />
   {errors.passport_no && <p className="text-red-600 text-sm">{errors.passport_no}</p>}
  
         </div>
        <div className="inputGroup">
            <label className='label' >Name</label>
            <input   ref={nameRef}
   onKeyDown={(e) => handleEnterPress(e, emailRef)} className='inputField' type="text" onChange={inputHandler} id='name' name='name' autoComplete='off' placeholder='Enter name' />
       {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
         </div>

         <div className="inputGroup">
                
            <label className='label' >E-mail</label>
            <input   ref={emailRef}
   onKeyDown={(e) => handleEnterPress(e, addressRef)} className='inputField' type="text" onChange={inputHandler} id='email' name='email' autoComplete='off' placeholder='Enter email' />
       {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
         </div>
        <div className="inputGroup">
            <label className='label' >Address</label>
            <input   ref={addressRef}
   onKeyDown={(e) => handleEnterPress(e, visitPurposeRef)} className='inputField' type="text" onChange={inputHandler} id='address' name='address' autoComplete='off' placeholder='Enter address' />
    {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}
        </div>
        <div className="inputGroup">
            <label className='label' >Purpose of Visit</label>
            <input   ref={visitPurposeRef}
   onKeyDown={(e) => handleEnterPress(e, undefined, true)} className='inputField' type="text" onChange={inputHandler} id='address' name='address' autoComplete='off' placeholder='Enter the purpose of visit' />
   
        </div>
        <div className="inputGroup">
            <button type="submit" className="save">Save</button>
        </div>
    </form>
    </div>
  )
}

export default AddGuestInfo
