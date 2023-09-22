import React, {useState} from 'react';
import {Input} from "@/components/index";
import axios from "axios";
import Swal from "sweetalert2";


const AddCategoryComponent = ({setReload}) => {
    const [newCategory, setNewCategory] = useState("");
    const addCategory = ()=>{
        axios.post("/api/category", {name:newCategory}).then(r=>{
            Swal.fire(
                'Good job!',
                'Success! Category ' + r.data.name + " was created",
                'success'
            );
            setReload(prev=>!prev);
            setNewCategory("")
        }).catch(er=>{
                Swal.fire({
                    title: 'Error! ' + er.response.data.error,
                    text: 'Do you want to continue',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
        }
            )
    }
    return (
            <div className={" flex flex-col justify-center items-center mt-2"}>
                <h2 className={"text-xl font-semibold mb-4"}>Add category</h2>
                <div className={"flex flex-row justify-center items-center gap-4 relative w-full"}>
                    <Input value={newCategory} setValue={setNewCategory} className='border-2 h-12'></Input>
                    <button
                        className=" bg-green hover:bg-dark-green text-white text-xl
                        rounded-r-lg px-2 absolute  border-0 duration-300 transition-all h-12 right-[0px]"
                        onClick={addCategory}>
                        +</button>
                </div>
            </div>
    );
};

export default AddCategoryComponent;