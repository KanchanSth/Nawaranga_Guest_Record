import  { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import type { KeyboardEvent, RefObject } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from "react-hot-toast"
import type { GuestInfoModel} from "../getGuestInfo/getGuestInfoModel"
import { IoIosArrowBack } from "react-icons/io";
const UpdateGuestInfo = () => {
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

useEffect(() => {
  roomRef.current?.focus(); 
}, []);

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

 let token =   localStorage.getItem("token");

const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    const res = await axios.put(`http://localhost:8000/api/update/guest/${id}`, guestInfo,
       {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(res.data.message, { position: "top-right" });
    console.log("Guest Information Updated successfully!");
    navigate("/", {replace: true});
  } catch (error: any) {
    console.log(error);
 const message = error.response?.data?.message || "Something went wrong";

  toast.error(message, { position: "top-right" });
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
    
      document.querySelector<HTMLFormElement>(".updateGuestInfo")?.requestSubmit();
      return;
    }

    
    nextRef?.current?.focus();
  }
};


 const {id} = useParams();
   

    useEffect(() => {
      
    axios.get(`http://localhost:8000/api/guest/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    .then((res)=>{
        setGuestInfo(res.data)

    }).catch((e)=>{
        console.log(e);
    });

      
    }, [id])
    
  return (
    
    <div className='updateFormContainer'>
    
<Link to="/" replace type="button" className="flex gap-2 mx-2 my-2 text-center border border-violet-600 justify-center md:text-[15px] hover:text-violet-800 rounded-xs  px-4  w-20 font-header  text-violet-950  py-3 bg-violet   cursor-pointer  "> <IoIosArrowBack className="text-2xl" /> Back</Link>
    <h3 className='text-center text-4xl font-semibold text-[#163152] mx-auto '>Update Guest Information</h3>
    <form action="" className="updateGuestInfo" onSubmit={submitForm}>
         <div className="inputGroup">
            <label  className='label' htmlFor="room_no">Room No</label>
            <input  ref={roomRef}
   onKeyDown={(e) => handleEnterPress(e, passportRef)}  className='inputField' type="text" onChange={inputHandler} value={guestInfo.room_no} id='room_no' name='room_no' autoComplete='off' placeholder='Enter the room number' />
            {errors.room_no && <p className="text-red-600 text-sm">{errors.room_no}</p>}
         </div>
          <div className="inputGroup">
            <label  className='label' htmlFor="passport_no">Passport No</label>
            <input ref={passportRef}
   onKeyDown={(e) => handleEnterPress(e, nameRef)}  className='inputField' type="text" onChange={inputHandler} value={guestInfo.passport_no} id='passport_no' name='passport_no' autoComplete='off' placeholder='Enter the passport number' />
            {errors.passport_no && <p className="text-red-600 text-sm">{errors.passport_no}</p>}
         </div>


        <div className="inputGroup">
            <label  className='label' htmlFor="name">Name</label>
            <input     ref={nameRef}
   onKeyDown={(e) => handleEnterPress(e, emailRef)} className='inputField' type="text" onChange={inputHandler} value={guestInfo.name} id='name' name='name' autoComplete='off' placeholder='Enter the name' />
              {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
         </div>

         <div className="inputGroup">
                
            <label  className='label' htmlFor="email">E-mail</label>
            <input ref={emailRef}
   onKeyDown={(e) => handleEnterPress(e, addressRef)} className='inputField' type="text" onChange={inputHandler} value={guestInfo.email}  id='email' name='email' autoComplete='off' placeholder='Enter the email' />
        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
        </div>
        <div className="inputGroup">
            <label  className='label' htmlFor="address">Address</label>
          
            <input ref={addressRef}
   onKeyDown={(e) => handleEnterPress(e, visitPurposeRef)} className='inputField' type="text" onChange={inputHandler} value={guestInfo.address}  id='address' name='address' autoComplete='off' placeholder='Enter the address' />
              {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}
        </div>
         <div className="inputGroup">
            <label className='label' htmlFor='purpose_of_visit'>Purpose of Visit</label>
            <input   ref={visitPurposeRef}
   onKeyDown={(e) => handleEnterPress(e, undefined, true)} className='inputField' type="text" onChange={inputHandler} value={guestInfo.purpose_of_visit} id='purpose_of_visit' name='purpose_of_visit' autoComplete='off' placeholder='Enter the purpose of visit' />
   
        </div>
        <div className="inputGroup">
            <button type="submit" className="save">Save</button>
        </div>
    </form>
    </div>
  )
}

export default UpdateGuestInfo
