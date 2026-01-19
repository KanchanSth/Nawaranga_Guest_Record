import  { useState, useEffect } from 'react'
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

import axios from "axios"
import { Link } from 'react-router-dom'
import toast from "react-hot-toast"
import type {GuestInfoRespnseModel} from "./getGuestInfoModel"

const GetGuestInfo = () => {
    const [guestsInfo, setGuestInfo] = useState<GuestInfoRespnseModel[]>([])
    useEffect(() => {
      const fetchData = async () => {

        try {

         const response = await axios.get("http://localhost:8000/api/guestsInfo");
         setGuestInfo(response.data);
            
        } catch (error) {
          console.log("Error while fetching data", error)  
        }
        
      };
      fetchData();
    }, [])

    const handleDelete = (id: string) => {
  const isConfirmed = window.confirm("Are you sure you want to delete this guest?");

  if (!isConfirmed) return;

  deleteGuestInfo(id);
};


    const deleteGuestInfo = async (guestId : string)=>{
        await axios.delete(`http://localhost:8000/api/delete/guest/${guestId}`)
        .then((res)=>{
            setGuestInfo((prevRecord)=>prevRecord.filter((guest)=>guest._id !== guestId))
            toast.success(res.data.message, {position: "top-right"})
        }).catch((e)=>{console.log(e)});

    }
  return (
    <div className="guestInfoTable">
      <Link to='/add' type="button" className="flex gap-1 mx-2 my-3 text-center border border-violet-600 justify-center md:text-[15px] hover:text-violet-800 rounded-xs py-2  px-2 w-30 font-header  text-violet-950 text-2xl  bg-violet cursor-pointer ">Add Guest <AiOutlineUserAdd className='text-2xl'/></Link>

{guestsInfo.length ===0 ? (
    <div className='noData'>
        <h3>No Data to display.</h3>

     </div>):
     
     
     ( 
      <div className="overflow-x-auto">
     <table className='table'>
            <thead className='thead'>
                <tr>
                    <th className="th" scope='col'>S.No.</th>
                    <th className="th" scope='col'>Room No.</th>
                    <th className="th" scope='col'>Name</th>
                    <th className="th"scope='col'>Email</th>
                    <th className="th"scope='col'>Address</th>
                    <th className="th"scope='col'>Purpose of Visit</th>
                    <th className="th"scope='col'>Actions</th>
                   
                </tr>
            </thead>
            <tbody className="tbody">
                {
                    guestsInfo.map((guest,index)=>{
                        return(
                            <tr className='tr'>
                    <td className='td'>{index+1}</td>
                    <td className='td'>{guest.room_no}</td>
                    <td className='td'>{guest.name}</td>
                    <td className='td'>{guest.email}</td>
                    <td className='td'>{guest.address}</td>
                    <td className='td'>{guest.purpose_of_visit}</td>
                    <td  className='actionsButton'>
                        <Link to={`/update/`+guest._id} type="button" >

                      <FaRegEdit className='text-2xl text-blue-800 '/>
                        </Link>
                        <button onClick={() => handleDelete(guest._id)} type="button" >

                         <MdDeleteOutline className='text-2xl text-red-500 '/>
                        </button>
                         </td>

                </tr>
                        );
                    })
                }
                
            </tbody>
        </table>
        
        </div>)}
    </div>
  )
}

export default GetGuestInfo
