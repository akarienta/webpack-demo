import styled from 'styled-components';
import PropTypes from 'prop-types';

const Vector = styled.div`
    background-image: url('${props => props.src}');
    background-size: ${props => props.width}px ${props => props.height}px;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    margin: 20px;
    display: inline-block;
    
    & svg {
      fill: ${props => props.color}
    }
`;

Vector.propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};

export default Vector;