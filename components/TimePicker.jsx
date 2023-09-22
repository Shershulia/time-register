import React from 'react';
import Datetime from "react-datetime"
import "react-datetime/css/react-datetime.css";
import {CalendarIcon} from "@/components/index";

const TimePicker = ({label,value,setValue}) => {
    return (
        <div className='flex flex-col items-start justify-center relative w-full mx-2'>
            <label className='font-semibold text-base lg:text-lg'>{label}</label>
            <div className='relative w-full'>
                <Datetime
                    value={value}
                    onChange={setValue}
                    input={true}
                    closeOnClickOutside
                    closeOnSelect
                    dateFormat=""
                    className="flex justify-center border rounded-lg w-full h-8 border-s-mint
                    bg-white [&_input]:px-3 [&_input]:md:w-full [&_input]:w-full [&_input]:text-start [&_input]:rounded-lg [&_input]:relative"
                />
                <div className='absolute right-0 top-0 w-8 border-s border-s-mint '>
                    <button className='flex bg-s-pink rounded-r-md w-full justify-center items-center' 
                        onClick={()=>{setValue(new Date)}}>
                        <div className='flex flex-col items-center justify-center mb-1 '>
                            <CalendarIcon className='w-4 h-4'></CalendarIcon>
                            <p className='text-xs text-gray-500 w-full text-center leading-3'>Now</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>

           
    );
};

export default TimePicker;