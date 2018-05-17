import styled from 'styled-components';

const Image = styled.img`
	margin: 20px;
	border: 2px solid ${props => props.theme.colors.outline};
`;

export default Image;
