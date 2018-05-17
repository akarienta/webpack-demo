import styled from 'styled-components';
import range from 'lodash/range';

const headlines = {};

range(1, 7).forEach(num => {
	headlines[`H${num}`] = styled[`h${num}`]`
		font-weight: ${props => props.theme.fontWeights.headline[`h${num}`]};
		color: ${props => props.theme.colors.headline[`h${num}`]};
		font-size: ${props => props.theme.fontSizes.headline[`h${num}`]};
	`;
});

const { H1, H2, H3, H4, H5, H6 } = headlines;

export { H1, H2, H3, H4, H5, H6 };
