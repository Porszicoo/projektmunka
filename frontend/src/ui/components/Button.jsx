import PropTypes from "prop-types";

export const Button = ({ label, id, type, classes }) => {
  return (
    <button className={classes} id={id} type={type}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
};
