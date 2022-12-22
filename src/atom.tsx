import React from 'react';
import { atom } from 'recoil';

export const toDoState = atom({
    key: 'todo', // unique ID (with respect to other atoms/selectors)
    default: {
      text: '',
      isComplished: false, 
    },
  });