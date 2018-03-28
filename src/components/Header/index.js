import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.scss';

const Header = ({ headline, subHeadline }) => (
	<div className={styles.header}>
		<h1>{headline}</h1>
		<h2>{subHeadline}</h2>
	</div>
);

Header.PpropTypes = {
	headline: PropTypes.string,
	subHeadline: PropTypes.string
};

export default Header;
