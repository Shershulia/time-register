import React from 'react';

const Input = ({label,value,setValue, className = "", children}) => {
    return (
        <div className='flex flex-col items-start justify-center w-full'>
            <div className='w-full h-full justify-between flex items-center'>
                <label className='font-semibold text-base lg:text-lg'>{label}</label>
                {children}
            </div>
            <input value={value} onChange={(e)=>setValue(e.target.value)} className={'flex w-full border border-s-mint rounded-lg ' + className}/>
        </div>
    );
};

export default Input;