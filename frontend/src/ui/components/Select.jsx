import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";

export const Select = ({ label, name, id, options }) => {
  const { control } = useFormContext();

  return (
    <div className="w-full max-w-xl min-w-[200px]">
      <label className="block mb-2 text-sm font-medium">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            id={id}
            {...field}
            name={name}
            className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
};
