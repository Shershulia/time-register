import React from 'react';

const Select = ({ label, options, value, setValue ,children,className }) => {
  return (
    <div className='flex flex-col items-start justify-center w-full'>
      <div className='w-full justify-between flex items-center'>
        <label className='font-semibold text-base lg:text-lg'>{label}</label>
        {children}
      </div>
      <select className={`flex justify-center items-center w-full border border-s-mint rounded-lg ${className}`}
        onChange={e => setValue(e.target.value)}
        defaultValue={value}
        >
        <option className='text-black p-2 w-full' value={""}  disabled>Select option</option>
        {options.map((option, key) => {
            return (
            <option className='text-black p-2 w-full' key={key} value={option.name} >
                {option.name}
            </option>
            );
        })}
    </select>
    </div>
  );
};

export default Select;
