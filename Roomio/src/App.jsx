import './App.css'
import User_login from './Components/User_login'
import{Routes,Route,BrowserRouter} from 'react-router-dom'
import MainPage from './Components/MainPage'
import CreateAccount from './Components/CreateAccount'
import Searchapartment from './Components/Searchapartment'
import AddPost from './Components/AddPost'

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<User_login />}></Route>
    <Route path='/login' element={<User_login />}></Route>
    <Route path='/MainPage' element={<MainPage />}></Route>
    <Route path='/CreateAccount' element={<CreateAccount />}></Route>
    <Route path='/searchapartment' element={<Searchapartment />}></Route>
    <Route path='/addPost' element={<AddPost />}></Route>

    </Routes>
    </BrowserRouter>
  )
}


export default App
