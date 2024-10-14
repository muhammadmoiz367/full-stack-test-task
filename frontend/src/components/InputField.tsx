import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  register: any;
  error?: string;
  endAdornment?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  register,
  error,
  endAdornment,
}) => {
  return (
    <div className='relative mb-4'>
      <label className='block text-gray-700 mb-2'>{label}</label>
      <div className='flex items-center'>
        <input
          type={type}
          {...register}
          className={`border rounded-lg p-2 w-full pr-10 focus:outline-none ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {endAdornment && (
          <span className='absolute right-3'>{endAdornment}</span>
        )}
      </div>
      {error && <p className='text-red-500 text-sm'>{error}</p>}
    </div>
  );
};

export default InputField;
