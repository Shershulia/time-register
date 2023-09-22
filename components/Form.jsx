import React, {useState, useEffect} from 'react';
import {Input, Select, TimePicker} from "@/components/index";
import Swal from 'sweetalert2'

import axios from 'axios';
const Form = ({setReload}) => {
    const [categories,setCategories] = useState([]);
    const [loadingCategories,setLoadingCategories] = useState(false)
    useEffect(()=>{
        axios.get("/api/category").then(r=>{
            setCategories(r.data)
            setLoadingCategories(true)
        })
    },[])

    const [desc, setDesc] = useState("");
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("");

    const [addCategory, setAddCategory] = useState(false);
    const [category, setCategory] = useState("");

    const [githubNumber, setGithubNumber] = useState("");
    const [addGithub, setAddGithub] = useState(false);
    const sendForm = async () => {
        const differenceInMilliseconds = endTime - startTime ;
        const differenceInHours = differenceInMilliseconds / (1000 * 3600);
        const data ={
            desc:desc,
            time:differenceInHours,
            category:category || null,
            gitHub: githubNumber.length>0 ? githubNumber.split(",") : null
        }
        try{
            await axios.post("api/timetrack",data)
            Swal.fire(
                'Good job!',
                'Success!',
                'success'
              )
            setDesc("");
            setCategory("");
            setGithubNumber("");
            setReload(prev=>prev+1);
        }catch (error){
            console.log(error)
            Swal.fire({
                title: 'Error! ' + error.response.data.msg,
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
        }
    }    



    useEffect(() => {
        // Check if localStorage is available (client-side)
        if (typeof window !== 'undefined') {
          // Access localStorage here
          const storedStartTime = localStorage.getItem('startTime');
          const storedEndTime = localStorage.getItem('endTime');
    
          // Set state based on localStorage values
          if (storedStartTime) {
            setStartTime(new Date(storedStartTime));
          }
          if (storedEndTime) {
            setEndTime(new Date(storedEndTime));
          }
        }
      }, []);

      useEffect(() => {
        // Check if localStorage is available (client-side)
        if (typeof window !== 'undefined') {
          // Access localStorage here
          const storedStartTime = localStorage.getItem('startTime');
          const storedEndTime = localStorage.getItem('endTime');
    
          // Set state based on localStorage values
          if (storedStartTime) {
            setStartTime(new Date(storedStartTime));
          }
          if (storedEndTime) {
            setEndTime(new Date(storedEndTime));
          }
        }
      }, []);

    const setStartTimeToLocalStorage = (data) =>{
        localStorage.setItem('startTime', data);
        setStartTime(data)
    }
    const setEndTimeToLocalStorage = (data) =>{
        localStorage.setItem('endTime', data);
        setEndTime(data)
    }

    return (
        <div className='flex flex-col justify-center items-center m-4 w-2/3 '>
            <div className="flex flex-col w-full md:justify-between md:items-center items-center justify-center bg-s-yellow rounded-t-lg px-6 py-2">
                <Input label={"Description"} value={desc} setValue={setDesc} className='h-20 p-3' ></Input>
                <div className='flex w-full md:flex-row flex-col items-center justify-between md:mt-4 md:py-2'>
                    <div className='flex flex-col justify-center items-center w-full'>
                        <TimePicker label={"Start time"} value={startTime} setValue={setStartTimeToLocalStorage} suppressHydrationWarning={true} ></TimePicker>
                        <TimePicker label={"End time"} value={endTime} setValue={setEndTimeToLocalStorage} suppressHydrationWarning={true} ></TimePicker>
                    </div>
                    <div className={`flex flex-col items-center justify-center w-full mx-12`}>
                        
                        <div className='flex flex-col items-center justify-center rounded-lg md:mt-0 mt-2 w-full'>
                            {addCategory  ? 
                                <div className='w-full justify-center flex items-center'>
                                    {loadingCategories && 
                                        <Select label={"Choose category"} options={categories} value={category} setValue={setCategory} className={"h-8 "}>
                                            <button className='bg-s-pink right-0 top-0 px-[2px] rounded-full ml-1 text-xs font-bold w-4 h-4' onClick={()=>{
                                                setAddCategory(false);
                                                setCategory("");
                                            }}>X</button>
                                        </Select> 
                                    }
                                    
                                </div>: 
                                <button className='flex justify-center items-center border border-s-mint h-14 rounded-full p-3 w-14 bg-white mb-1 hover:bg-s-pink transition-all duration-700' onClick={()=>setAddCategory(true)}>
                                    <p className='text-xs text-ellipsis'>Category</p>
                                </button>
                }   
                            {addGithub  ? 
                                <div className='w-full justify-cener flex items-center'>
                                    <Input label={"Github issues"} value={githubNumber} setValue={setGithubNumber} className=' h-8 p-3 ' >
                                        <button className='bg-s-pink right-0 top-0 px-[2px] rounded-full ml-1 text-xs font-bold w-4 h-4'
                                                onClick={()=>{setAddGithub(false);
                                        setGithubNumber("")}}>X</button>
                                    </Input> 
                                </div>: 

                                <button className='flex justify-center items-center border border-s-mint h-14 rounded-full p-3 w-14 bg-white mt-1 hover:bg-s-pink transition-all duration-700' onClick={()=>setAddGithub(true)}>
                                    <p className='text-xs text-ellipsis'>Github number</p>
                                </button>
                            }


                        </div>

                    </div>                
                </div>
            </div>
            <button className='w-full bg-s-mint rounded-b-lg py-6 transition-all hover:bg-s-blue duration-700 text-white font-bold' onClick={sendForm}>Send</button>
        </div>
    );
};

export default Form;