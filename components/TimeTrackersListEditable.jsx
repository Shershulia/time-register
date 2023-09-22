import React from 'react';
import axios from "axios";
import {TableRow} from "@/components/index";
import Swal from 'sweetalert2';
const TimeTrackersListEditable = ({ array =[] , setReload, page}) => {

    const deleteItem = (id)=>{
        axios.delete(`api/timetrack?id=${id}`).then(r => {
            Swal.fire(
                'Good job!',
                "Success! Item with description " + r.data.desc + " was deleted",
                'success'
              )
            setReload(prev => prev + 1);
        } )
    }
    const editItem = (_id,newDescription,newTime,newCategory,newGitHub)=>{
        const data = {
            _id, desc:newDescription,time:newTime,category:newCategory,gitHub:newGitHub
        }
        axios.put(`api/timetrack`,data).then(r => {
            Swal.fire(
                'Good job!',
                "Success! Item with description " + r.data.desc + " was updated",
                'success'
              )
            setReload(prev => prev + 1);
            
        } )
    }
    return (
        <div className=' w-full flex justify-center items-center h-fit mb-8'>

            {   array.length>0 ? (
            
                <table className=' border-collapse w-2/3 font-normal gap-2'>
                    <tr className=' border bg-white'>
                        <th>#</th>
                        <th>Description</th>
                        <th>Time</th>
                        <th>Category</th>
                        <th >Github (first 3)</th>
                        <th></th>
                        <th></th>

                    </tr>
                    {array?.map((item, index) => (
                        <TableRow item={item} rowKey={index} page={page} deleteItem={deleteItem} editItem={editItem}></TableRow>
                    ))}
                </table>
            ) : <h1>No available records on this page</h1>
            }
        </div>
    );
};

export default TimeTrackersListEditable;
