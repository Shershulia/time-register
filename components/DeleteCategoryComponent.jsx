import React, {useState} from 'react';
import {Select} from "@/components/index";
import axios from "axios";
import Swal from "sweetalert2";

const DeleteCategoryComponent = ({options, setReload}) => {
    const [choosen,setChoosen] = useState(options[0]?.name);

    const deleteCategory = ()=>{
        axios.delete("/api/category?name=" + choosen).then(r=>{
            Swal.fire(
                'Good job!',
                'Success! Category ' + r.data.name + " was deleted",
                'success'
            )
            setChoosen(options[0]?.name)
            setReload(prev=>!prev);
        }).catch(er=>{
                Swal.fire({
                    title: 'Error! ' + er.response?.data.error,
                    text: 'Do you want to continue',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
        }
            )
    }
    return (
        <div className={" flex flex-col justify-center items-center mt-2 w-full"}>
            <h2 className={"text-xl font-semibold mb-4"}>Delete category</h2>
            <div className={"flex flex-row justify-center items-center gap-0 relative w-full"}>
                <Select value={choosen} setValue={setChoosen} options={options} className='border-2 rounded-l-lg  appearance-none text-left w-full pl-2 h-12'></Select>
                <button
                    className=" bg-red hover:bg-dark-red text-white text-xl
                    rounded-r-lg px-3 border-0 duration-300 transition-all absolute right-[0px] h-12"
                    onClick={deleteCategory}>-</button>
            </div>
        </div>
    );
};

export default DeleteCategoryComponent;