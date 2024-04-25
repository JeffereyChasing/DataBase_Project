import './App.css'
import User_login from './Components/User_login'
import{Routes,Route,BrowserRouter} from 'react-router-dom'
import MainPage from './Components/MainPage'





function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<User_login />}></Route>
    <Route path='/login' element={<User_login />}></Route>
    <Route path='/MainPage' element={<MainPage />}></Route>

    </Routes>
    </BrowserRouter>
  )
}


export default App
