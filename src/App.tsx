import React from 'react';
import logo from './logo.svg';
import './App.css';
import MenuBar from './components/menuBar';
import { Route, Routes } from 'react-router-dom';
import ToDoList from './routes/ToDoList';
import { RecoilRoot } from 'recoil';


function App() {
  return (
    <RecoilRoot>
      <div>
        <MenuBar currentMenuItem="test" />
        <Routes>
          <Route path="/toDoList" element={<ToDoList/>}/>
        </Routes>
        
      </div>
    </RecoilRoot>
  );
}

export default App;
