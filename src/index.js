import React from 'react';
import { render } from 'react-dom';

import Main from './main';

import 'purecss';
import './styles/main.scss';

const root = document.createElement('div');
root.setAttribute('id', 'root');

document.body.appendChild(root);

render(<Main />, root);
