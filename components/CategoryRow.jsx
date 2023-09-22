import React, {useState} from 'react';
import Input from "@/components/Input";
import axios from "axios";
import Swal from "sweetalert2";

const CategoryRow = ({index,item, setReload}) => {
    const [edit,setEdit] = useState(true);
    const [newCategory,setNewCategory]=useState(item.name);

    const editItems = () =>{
        if (edit){
            setEdit(false)
        }else{
            setEdit(true)
            axios.put("/api/category",{_id:item._id,name:newCategory}).then(r=>{
                Swal.fire(
                    'Good job!',
                    "Success! Item with description " + newCategory + " was edited",
                    'success'
                )
                setReload(prev=>!prev);
            }).catch(err=>{
                Swal.fire({
                    title: 'Error! ' + err.response?.data.error,
                    text: 'Do you want to continue',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            })
        }
    }
    return (
        <div className="flex justify-between items-center w-full border-s-mint border bg-white">

            {edit ?
                <p key={index} className="px-4">{item.name}</p>
                :
                <Input value={newCategory} className={"w-full justify-center text-center"} setValue={setNewCategory}/>}
            <button className="px-4 bg-yellow hover:bg-dark-yellow transition-all duration-300 py-3"
                    onClick={editItems}>Edit</button>
        </div>
    );
};

export default CategoryRow;