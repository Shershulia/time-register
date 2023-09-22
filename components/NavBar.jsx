import React, {useEffect, useState} from 'react';
import {useSession} from "next-auth/react";
import {Hamburger, LoginLogout, NavLinks, XMark} from "@/components/index";
import axios from 'axios';


const NavBar = () => {
    const { data: session } = useSession();
    const [navActive,setNavActive] = useState(false);

    
    return (
        <div className={` w-full mb-16 flex justify-center border-b`}>
            <div className={`w-full m-auto justify-between hidden md:flex`}>
                <NavLinks session={session}  ></NavLinks>
            </div>
            <div className='w-full justify-between flex md:w-min'>
                <div className='flex justify-center items-center p-2 md:hidden hover:bg-s-blue transition-all duration-700 ' 
                onClick={()=>setNavActive(prevState => !prevState)}>
                    <Hamburger></Hamburger>
                </div>
                <LoginLogout session={session}></LoginLogout>
            </div>
            <div className={` absolute ${navActive ? "block" : "hidden"} md:hidden flex flex-col justify-center items-center  h-full w-full bg-background z-10`}>
                <div className='w-full'>
                    <div
                        className='flex justify-start p-2 w-10 md:hidden transition-all duration-700 hover:bg-s-blue '
                        onClick={()=>setNavActive(prevState => !prevState)}>
                            <XMark></XMark>
                    </div>
                </div>
                    <div className='flex flex-col w-full h-full items-center justify-between z-10'>
                        <div></div>
                        <div className='flex flex-col w-full justify-center items-center'>
                            <NavLinks session={session}></NavLinks>
                        </div>
                        <LoginLogout session={session}></LoginLogout>

                    </div>
                
            </div>
            

                
        </div>
    );
};

export default NavBar;
