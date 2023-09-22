import React from 'react';
import {signIn, signOut} from "next-auth/react";

const LoginLogout = ({session}) => {
    return (
        <div>
            {!session ?
                <button onClick={() => signIn("google")} className='py-2 px-10 hover:bg-dark-blue transition-all duration-700'>Login</button>
                :
                <button onClick={() => signOut()} className='py-2 px-10 hover:bg-dark-blue transition-all duration-700'>Logout</button>}
        </div>
    );
};

export default LoginLogout;