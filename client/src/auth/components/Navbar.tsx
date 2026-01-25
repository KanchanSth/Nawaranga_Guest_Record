import { logout } from "../../utils/auth"

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-violet-100 text-violet-950 py-2'>
    <div className='logo'>
        
        <p className='font-bold text-center text-2xl mx-2'>Nawaranga</p></div>  
    <ul className='flex gap-8 mx-9'>
        <li className='cursor-pointer hover:font-bold transition-all'> <button onClick={logout} className="text-red-600">
         Logout
       </button></li>
        {/* <li className='cursor-pointer hover:font-bold transition-all'>Your Task</li> */}
    </ul>
    </nav>
  )
}

export default Navbar