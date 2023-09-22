import React, {useState} from 'react';
import {Select, Input} from "@/components/index";

const TableRow = ({rowKey,item,page,deleteItem, editItem}) => {
    //TODO: CHANGE CATEGORIES
    const categories = [{name:"hello"},{name:"test"}]


    const[editMode, setEditMode]=useState(false);
    const [newDescription, setNewDescription] = useState(item.desc);
    const [newTime, setNewTime] = useState(item.time.toFixed(2));
    const [newCategory, setNewCategory] = useState(item.category);
    const [newGitHub, setNewGitHub] = useState(item.gitHub?.toString() || "")

    return (
        <>
        {!editMode ? (
            <tr key={rowKey} className={`border ${rowKey%2===0 ? "bg-s-blue" : " bg-s-mint"} hover:bg-s-yellow duration-300 transition-all `}>
                <th>{rowKey+1 + (page-1)*5}</th>
                <th>{item.desc}</th>
                <th>{item.time.toFixed(2)}</th>
                <th>{item.category}</th>
                <th className={"text-ellipsis"}>{item.gitHub?.slice(0,3).toString()}</th>
                <th className=' bg-yellow cursor-pointer transition-all duration-700 hover:bg-dark-yellow'
                    onClick={()=>setEditMode(prevState => !prevState)}
                >
                    Edit
                </th>
                <th className=' bg-red cursor-pointer transition-all duration-700 hover:bg-dark-red' onClick={()=>{
                    deleteItem(item._id)
                }}>
                    Delete
                </th>
            </tr>
                )
        :
            (<tr key={rowKey} className={`border ${rowKey%2===0 ? "bg-s-blue" : " bg-s-mint"}`}>
                <th>{rowKey+1 + (page-1)*5}</th>
                <th><Input value={newDescription} setValue={setNewDescription} className={"p-0 m-0 text-center"}/></th>
                <th><Input value={newTime} setValue={setNewTime} className={"p-0 m-0 text-center"}/></th>
                <th>
                    <Select options={categories} value={newCategory} setValue={setNewCategory}></Select>
                </th>
                <th className={"text-ellipsis"}><Input value={newGitHub} setValue={setNewGitHub} className={"p-0 m-0 text-center"}></Input></th>
                <th className=' cursor-pointer transition-all duration-700 bg-green hover:bg-dark-green'
                        onClick={()=>{
                            editItem(item._id,newDescription,newTime,newCategory,newGitHub.split(","))
                        }}
                >
                    Confirm
                </th>
                <th className=' bg-red cursor-pointer transition-all duration-700 hover:bg-dark-red'
                    onClick={()=>setEditMode(prevState => !prevState)}>
                    Cancel
                </th>
            </tr>)
        }
        </>
    );
};

export default TableRow;