import React, {useEffect, useState} from 'react';
import {Spinner, TimeTrackersListEditable} from "@/components/index";
import axios from "axios";
import Swal from "sweetalert2";

const PersonalRecordsWithPagination = () => {
    const [page,setPage] = useState(1);
    const [items,setItems] = useState([]);
    const [loading,setLoading] = useState(true);
    const [reload,setReload] = useState(0);

    useEffect(()=>{
        setLoading(true)
        axios.get(`api/timetrack?page=${page}`).then(r => {
            setItems(r.data);
            setLoading(false)
        } )
    },[page,reload])

    return (
        <div className={"w-full mb-12"}>
            <div className='w-full flex items-center justify-center flex-col '>
                    <h1 className='text-xl mb-8 mt-2 font-bold'>All your records</h1>
            {loading ? (
                <Spinner></Spinner>
            ) : (
                
                    <TimeTrackersListEditable array={items} setReload={setReload} page={page}></TimeTrackersListEditable>
                    
                    )}
                    <div className='flex gap-4 justify-center items-center'>
                        <button 
                        className={` p-2 font-bold  transition-all duration-300 rounded ${page===1 ? " bg-gray cursor-not-allowed opacity-25" : "bg-white hover:bg-s-mint"}`}
                        disabled={page===1}
                        onClick={()=>{
                            if(page===1){
                                Swal.fire({
                                    title: 'Error! Cant go to page number 0',
                                    text: 'Do you want to continue',
                                    icon: 'error',
                                    confirmButtonText: 'Cool'
                                  })
                                  return;
                            }
                            setPage(prev=>prev-1)
                            }}>
                        ←
                        </button>
                        <p className=' text-xl'>{page}</p>
                        <button className={` p-2 font-bold  transition-all duration-300 rounded ${items.length<5 ? " bg-gray cursor-not-allowed opacity-25" : "bg-white hover:bg-s-mint"}`} 
                        onClick={()=>{setPage(prev=>prev+1)}} disabled={items.length<5}>
                        →
                        </button>
                    </div>
            </div>
        </div>
    );
};

export default PersonalRecordsWithPagination;