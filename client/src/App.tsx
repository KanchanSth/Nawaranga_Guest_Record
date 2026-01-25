
import AddGuestInfo from './addGuestInfo/AddGuestInfo.tsx';
import './App.css'
import GetGuestInfo from './getGuestInfo/GetGuestInfo.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import UpdateGuestInfo from './updateGuestInfo/UpdateGuestInfo.tsx';
import { Toaster } from "react-hot-toast";
import Registeration from './auth/registeration/registeration.tsx';
import LogIn from './auth/login/login.tsx';
import useAutoLogout from './hooks/useAutoLogout.ts';
import ProtectedRoute from './routes/ProtectedRoute.tsx';

function App() {
 
useAutoLogout();
const route = createBrowserRouter([
  {
      path: "/login",
      element: <LogIn />,
    },

  {
    
 path: '/registeration',
    element:<Registeration/>,
  },
  
  {
      path: "/",
      element: (
        <ProtectedRoute>
          <GetGuestInfo />
        </ProtectedRoute>
      ),
    },
    
   
   { path:'/add',
    element:<AddGuestInfo/>,
  },
  { path:'/update/:id',
    element:<UpdateGuestInfo/>,
  },
  ])

  return (
    <div className="App">
      <Toaster position="top-right" />
     <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App
