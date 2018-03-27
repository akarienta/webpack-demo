import React from 'react';
import { render } from 'react-dom';

import Main from './main';

import './styles/main.scss';
import 'purecss';

const root = document.createElement('div');
root.setAttribute('id', 'root');

document.body.appendChild(root);

render(<Main />, root);
