import React from 'react';
import PropTypes from 'prop-types';

import CenteredDiv from './CenteredDiv';
import { H1, H2 } from './Headlines';

const Header = ({ headline, subHeadline }) => (
	<CenteredDiv>
		<H1>{headline}</H1>
		<H2>{subHeadline}</H2>
	</CenteredDiv>
);

Header.PpropTypes = {
	headline: PropTypes.string,
	subHeadline: PropTypes.string
};

export default Header;
