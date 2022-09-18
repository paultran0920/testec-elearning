import {  useState } from 'react';
import MainPage from './components/MainPage';
import { SystemMsg } from './components/SystemMsg';
import { ContextDataType, defaultContext, AppContext } from './context/AppContext';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NewUser from './components/NewUser';
import Login from './components/Login';
import ViewUser from './components/ViewUser';

function App() {
  const [contextData, setContextData] = useState<ContextDataType>(defaultContext);

  return (
    <AppContext.Provider value={{ contextData: contextData, setContextData: setContextData }}>
      <SystemMsg />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new" element={<NewUser />} />
          <Route path="/view/:userName" element={<ViewUser />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
