import React from 'react';
import Link from "next/link";


const NavLinks = ({session}) => {
    return (
        <>
            <Link href={"/"} className='py-2 px-10 hover:bg-dark-blue transition-all duration-700 w-full text-center'>Home</Link>
            <Link href={"/team-time"} className='py-2 px-10 hover:bg-dark-blue transition-all duration-700 w-full text-center'>Team time track</Link>
            {session && <Link href={"/personal"} className='py-2 px-10 hover:bg-dark-blue transition-all duration-700 w-full text-center'>My Stats</Link>}

        </>
    );
};

export default NavLinks;
