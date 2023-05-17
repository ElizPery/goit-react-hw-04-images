import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({onClick}) => {
 return <button type="button" className={css.button} onClick={onClick}>Load more</button>;
}

export default Button;

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
}