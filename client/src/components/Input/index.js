import React from "react";

const Input = ({
  label = "",
  name = "",
  type = "text",
  inputClassName = "",
  className = "",
  isRequired = false,
  placeholder = "",
  value = "",
  onChange = () => {}
}) => {
  return (
    <div className={`w-1/2 ${className}`}>
      <label
        for={name}
        className="block mb-2 text-sm font-medium"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-l focus:ring-blue-500
         focus:border-blue-500 block w-full p-1 tex-xs ${inputClassName}`}
        placeholder={placeholder}
        required={isRequired}
        value={value} 
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
