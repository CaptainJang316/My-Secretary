import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import MenuBar from './components/menuBar';
import { Route, Routes } from 'react-router-dom';
import ToDoList from './routes/ToDoList';
import { RecoilRoot } from 'recoil';
import styled from 'styled-components';


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
        </Routes>
      </Wrapper>      
    </RecoilRoot>
  );
}

export default App;
