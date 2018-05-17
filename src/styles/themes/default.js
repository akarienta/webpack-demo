import { injectGlobal } from 'styled-components';
import global from '../global';

const variables = {
	colors: {
		background: '#1f8dd6',
		primary: 'navy',
		headline: {
			h1: '#eee',
			h2: '#ccc'
		}
	},
	fontSizes: {
		headline: {
			h1: '3em'
		}
	},
	fontWeights: {
		headline: {
			h1: 300,
			h2: 300
		}
	},
	fonts: {
		primary: 'Gloria Hallelujah'
	}
};

injectGlobal`
  ${global(variables)}
`;

export default variables;
