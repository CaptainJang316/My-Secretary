import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import MenuBar from './components/menuBar';
import { Route, Routes } from 'react-router-dom';
import ToDoList from './routes/ToDoList';
import { RecoilRoot } from 'recoil';
import styled from 'styled-components';
import TimeDifference from './routes/TimeDifference';
import Scheduler from './routes/Scheduler';
import PptxGenJS from './routes/txtToPPT';


const Wrapper = styled.div`
  height: 100vh;
  background-image: url('img/background.gif');
  background-repeat: round;
  // background-size: cover;
`

function App() {

  return (
    <RecoilRoot>
      <Wrapper>
        <MenuBar currentMenuItem="test" />
        <Routes>
          <Route path="/toDoList" element={<ToDoList/>}/>
          <Route path="/diary" element={<TimeDifference/>}/>
          <Route path="/scheduler" element={<Scheduler/>}/>
          <Route path="/실험실" element={<PptxGenJS/>}/>
        </Routes>
      </Wrapper>      
    </RecoilRoot>
  );
}

export default App;
