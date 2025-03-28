import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";

export const Input = ({ label, name, id, type }) => {
  const { control } = useFormContext();

  return (
    <div className="w-full max-w-xl min-w-[200px]">
      <label className="block mb-2 text-sm font-medium">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={id}
            {...field}
            name={name}
            type={type}
            className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          />
        )}
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
};
