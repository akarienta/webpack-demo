import React from 'react';
import { ThemeProvider } from 'styled-components';

import Header from './components/Header';
import Image from './components/Image';
import CenteredDiv from './components/CenteredDiv';
import Vector from './components/Vector';

import defaultTheme from './styles/themes/defaultTheme';

import img from './assets/images/img.jpg';
import svg from './assets/images/svg.svg';

const Main = () => (
	<ThemeProvider theme={defaultTheme}>
		<div>
			<Header headline="Hello world" subHeadline="This is my Webpack demo app" />
			<CenteredDiv>
				<Image src={img} alt="Image placeholder" />
			</CenteredDiv>
            <CenteredDiv>
                <Vector src={svg} width={400} height={200} />
            </CenteredDiv>
		</div>
	</ThemeProvider>
);

export default Main;
