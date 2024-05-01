import './App.css';
import User_login from './Components/User_login';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainPage from './Components/MainPage';
import CreateAccount from './Components/CreateAccount';
import Searchapartment from './Components/Searchapartment';
import Add from './Components/Add';
import View from './Components/View';
import Pets from './Components/Pets';
import InterestGroup from './Components/InterestGroup';
import Average from './Components/Average';
import React, { createContext, useContext, useState } from 'react';
import UnitSearch from './Components/UnitSearch';
import BuildingSearch from './Components/BuildingSearch';
import EditPets from './Components/EditPets';
import AddPets from './Components/AddPets';
import SpecificInterest from './Components/SpecificInterest';
import DeletePets from './Components/DeletePets';

// Create a Global Context
const GlobalContext = createContext();

// Create a custom hook for using the global context
export const useGlobal = () => useContext(GlobalContext);

// Define the GlobalProvider component
  const GlobalProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    user: "John Doe"
  });

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Main App component
function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<User_login />}></Route>
          <Route path='/login' element={<User_login />}></Route>
          <Route path='/MainPage/:id' element={<MainPage />}></Route>
          <Route path='/CreateAccount' element={<CreateAccount />}></Route>
          <Route path='/searchapartment/:id' element={<Searchapartment />}></Route>
          <Route path='/add/:id' element={<Add />}></Route>
          <Route path='/view' element={<View />}></Route>
          <Route path='/pets/:id' element={<Pets />}></Route>

          <Route path='/unitsearch' element={<UnitSearch />}></Route>
          <Route path='/buildingsearch' element={<BuildingSearch />}></Route>
          <Route path='/editpets/:username/:id' element={<EditPets />}></Route>
          <Route path='/addpets/:id' element={<AddPets />}></Route>
          <Route path='/specificinterest/:id' element={<SpecificInterest />}></Route>
          <Route path='/deletepets/:username/:id/:type' element={<DeletePets />}></Route>







          <Route path='/interestgroup' element={<InterestGroup />}></Route>
          <Route path='/average' element={<Average />}></Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
