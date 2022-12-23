import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import MenuBar from './components/menuBar';
import { Route, Routes } from 'react-router-dom';
import ToDoList from './routes/ToDoList';
import { RecoilRoot } from 'recoil';
import styled from 'styled-components';

import axios from 'axios';


const Wrapper = styled.div`
  height: 100vh;
  // background: black;
  background-image: url('img/background.gif');
  // background-repeat: no-repeat;
  // background-size: cover;
`

function App() {

  useEffect(() => {
    axios.get('/api/test')
      .then(res => console.log(res))
      .catch();
  })

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
