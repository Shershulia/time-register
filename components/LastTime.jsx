import React, { useState, useEffect } from 'react';
import { Spinner, TimeTrackersList } from '@/components/index';
import axios from 'axios';
import {useSession} from "next-auth/react";


const LastTime = ({reload}) => {
    const { data: session } = useSession();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
         if(!session){
             setLoading(false)
             return;
         }
         axios.get('/api/timetrack').then(r=>{
             setItems(r.data);
             setLoading(false)
         }).catch(err=> setLoading(false));
     }, [session,reload]);

    return (
        <div className={`flex flex-col w-full items-center justify-center `}>
            {loading ? (
                <Spinner></Spinner>
                ) : (
                    <div className={`w-full flex items-center justify-center flex-col ${items.length>0 ? "block" : "hidden"} `}>
                    <h1 className=' text-xl font-bold mb-4'>Your last 5 records</h1>
                    <div  className='w-full'>
                        <TimeTrackersList array={items}></TimeTrackersList>
                    </div>
                    </div>
            )}
        </div>
    );
};

export default LastTime;


