import axios from "axios";
import React, {useEffect, useState} from "react";
import {AddCategoryComponent, CategoryRow, DeleteCategoryComponent, Input, NavBar, Spinner, TableRow} from "@/components";

export default function AdminPage() {

    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(false)

    const [loading,setLoading] = useState(false);
    const [isAdmin,setIsAdmin] = useState(false);

    const [reload, setReload] = useState(false);

    const [] = useState();
    useEffect(()=>{
        axios.get("/api/admin").then(r=>{
            setIsAdmin(r.data)
            setLoading(true)
        })
    },[])

    useEffect(()=>{
        axios.get("/api/category").then(r=>{
            setCategories(r.data)
            setLoadingCategories(true)
        })
    },[reload])
    return(
        <>
            {!loading ?
                <Spinner></Spinner>
                :
                <div className="flex flex-col justify-center items-center">
                    <NavBar></NavBar>
                    {isAdmin ?
                        <div className="w-1/2">
                            <h1 className=" font-bold text-2xl text-center">
                                Admin Page
                            </h1>

                            <AddCategoryComponent setReload={setReload} ></AddCategoryComponent>
                            { !loadingCategories ? <Spinner/> :
                                <div>
                                    <DeleteCategoryComponent options={categories} setReload={setReload}/>
                                    <div className="flex flex-col justify-center items-start mt-8 w-full gap-2">
                                        {categories.length > 0 &&
                                            categories.map((item, index) => (
                                                <CategoryRow item={item} index={index} setReload={setReload}></CategoryRow>
                                            ))}
                                    </div>
                                </div>

                            }
                        </div>
                        :
                        <div>
                            <p>Permission denied</p>
                        </div>}
                </div>
            }

                </>


    )
}
