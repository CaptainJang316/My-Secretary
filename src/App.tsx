import React from 'react';
import logo from './logo.svg';
import './App.css';
import MenuBar from './components/menuBar';
import { Route, Routes } from 'react-router-dom';
import ToDoList from './routes/ToDoList';


function App() {
  return (
    <div>
      <MenuBar currentMenuItem="test" />
      <Routes>
        <Route path="/toDoList" element={<ToDoList/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
