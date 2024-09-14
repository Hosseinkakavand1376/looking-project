import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import API from './API';
import HomePage from './components/HomePage';
import FindFriend from './components/FriendPage/FindFriend';
import Challenge from './components/Challenge';
import Ranking from './components/Ranking';
import NavBar from './components/Navbar/NavBar';
import Layout from './components/Layout';

import { motion } from "framer-motion"
import { NextUIProvider } from '@nextui-org/react';


function App() {

 /*  const [state, setState] = useState({name: ""});

  const getmain = async () => {
    try{
      const res = await API.simplefetch();
      console.log("hi");
      console.log(res);
    }catch(err){
      console.log("bye");
      console.log(err);
    }
  } */

  return (
    <>
      <NextUIProvider>
         <div style={{ background: "#192935", minHeight: "100vh", display: "flex", flexDirection: "column", }}>
         <BrowserRouter>
          <NavBar />
         
            <Routes>
              <Route index element={<HomePage />} />
              <Route path='/find-friend' element={<FindFriend />} />
              <Route path='/challenge' element={<Challenge />} />
              <Route path='/ranking' element={<Ranking />} />
            </Routes>
          </BrowserRouter>
        </div>
      </NextUIProvider>
    </>
  );
}

export default App;
