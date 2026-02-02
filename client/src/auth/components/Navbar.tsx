import { logout } from "../../utils/auth"

const Navbar : React.FC = () => {
  return (
    <nav className='flex justify-between bg-white text-[#ff8502] py-2 px-4 shadow-md'>
    <div className='logo'>
        
        <p className='font-bold text-center text-2xl'>Nawaranga</p></div>  
    <ul className='flex gap-8 mx-2'>
        <li className=''> <button onClick={logout} className="cursor-pointer hover:bg-red-600 hover:text-white text-red-600 border border-red-600 px-2 py-2 rounded-md ">
         Logout
       </button></li>
        
    </ul>
    </nav>
  )
}

export default Navbar