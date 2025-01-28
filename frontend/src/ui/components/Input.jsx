import PropTypes from "prop-types";

export const Input = ({
  label,
  name,
  id,
  type,
  value,
  isRequired,
  onChange,
}) => {
  return (
    <div className="w-full max-w-xl min-w-[200px]">
      <label className="block mb-2 text-sm font-medium">{label}</label>
      <input
        id={id}
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        required={isRequired}
        className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
};
