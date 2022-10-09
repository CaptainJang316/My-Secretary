import React from 'react';
import logo from './logo.svg';
import './App.css';
import MenuBar from './components/menuBar';


function App() {
  return (
    <div>
      <MenuBar currentMenuItem="test" />
    </div>
  );
}

export default App;
