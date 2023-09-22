import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinner = () => {
    return (
        <div className='w-full flex items-center justify-center h-[200px]'>
            <ClipLoader color="#EDB7ED"></ClipLoader>
        </div>
    );
};

export default Spinner;