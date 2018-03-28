import React from 'react';
import { ThemeProvider } from 'styled-components';

import Header from './components/Header';
import Image from './components/Image';
import CenteredDiv from './components/CenteredDiv';

import defaultTheme from './styles/themes/defaultTheme';

import img from './assets/images/img.jpg';

const Main = () => (
	<ThemeProvider theme={defaultTheme}>
		<div>
			<Header headline="Hello world" subHeadline="This is my Webpack demo app" />
			<CenteredDiv>
				<Image src={img} alt="Image placeholder" />
			</CenteredDiv>
		</div>
	</ThemeProvider>
);

export default Main;
