import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ headline, subHeadline }) => (
	<div className="header">
		<h1>{headline}</h1>
		<h2>{subHeadline}</h2>
	</div>
);

Header.PpropTypes = {
	headline: PropTypes.string,
	subHeadline: PropTypes.string
};

export default Header;
