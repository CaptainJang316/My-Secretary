import React from 'react';
import { atom } from 'recoil';

export const toDosState = atom({
    key: 'todos', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });