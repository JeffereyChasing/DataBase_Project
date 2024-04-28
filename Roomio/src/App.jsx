import './App.css'
import User_login from './Components/User_login'
import{Routes,Route,BrowserRouter} from 'react-router-dom'
import MainPage from './Components/MainPage'
import CreateAccount from './Components/CreateAccount'
import Searchapartment from './Components/Searchapartment'
import Add from './Components/Add'
import View from './Components/View'
import Pets from './Components/Pets'
import InterestGroup from './Components/InterestGroup'
import Average from './Components/Average'

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<User_login />}></Route>
    <Route path='/login' element={<User_login />}></Route>
    <Route path='/MainPage' element={<MainPage />}></Route>
    <Route path='/CreateAccount' element={<CreateAccount />}></Route>
    <Route path='/searchapartment' element={<Searchapartment />}></Route>
    <Route path='/add' element={<Add />}></Route>
    <Route path='/view' element={<View />}></Route>
    <Route path='/pets' element={<Pets />}></Route>
    <Route path='/interestgroup' element={<InterestGroup />}></Route>
    <Route path='/average' element={<Average />}></Route>

    </Routes>
    </BrowserRouter>
  )
}


export default App
