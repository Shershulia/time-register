import React, {useEffect, useState} from 'react';
import {NavBar, PersonalRecordsWithPagination, TimeTrackersList} from "@/components";
import axios from "axios";
import {useSession} from "next-auth/react";
import Link from 'next/link';

const PersonalPage = () => {
    const { data: session } = useSession();
    const [isAdmin,setIsAdmin] = useState(false);
    useEffect(()=>{
        if(session) {
            axios.get("api/admin").then(r=>{
                setIsAdmin(r.data)
            })
        }
    },[])
    return (
        <div className="flex flex-col items-center w-full h-screen">
            <NavBar></NavBar>
            <PersonalRecordsWithPagination></PersonalRecordsWithPagination>
            {isAdmin && <Link href={"/admin"} className='p-2 bg-green rounded-xl' >Admin panel</Link>}
        </div>
    );
};

export default PersonalPage;

