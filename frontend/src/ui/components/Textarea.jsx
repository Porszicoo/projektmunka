import PropTypes from "prop-types";

export const Textarea = ({ label, name, id, value, isRequired, onChange }) => {
  return (
    <div className="relative max-w-xl w-full min-w-[200px]">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={isRequired}
        className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
        placeholder=" "
      ></textarea>
    </div>
  );
};

Textarea.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
};
