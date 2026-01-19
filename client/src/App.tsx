
import AddGuestInfo from './addGuestInfo/AddGuestInfo.tsx';
import './App.css'
import GetGuestInfo from './getGuestInfo/GetGuestInfo.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import UpdateGuestInfo from './updateGuestInfo/UpdateGuestInfo.tsx';
import { Toaster } from "react-hot-toast";

function App() {
 

const route = createBrowserRouter([
   { path:'/',
    element:<GetGuestInfo/>,
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
