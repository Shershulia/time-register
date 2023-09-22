import {Form, NavBar} from "@/components";
import LastTime from "@/components/LastTime";
import React, { useState } from "react";

export default function Home() {
  const[reloadLastItems, setReloadLastItems]=useState(0)

  return (
    <div className="flex flex-col items-center w-full h-screen">
        <NavBar></NavBar>
        <Form setReload={setReloadLastItems}></Form>
        <LastTime reload={reloadLastItems}></LastTime>
    </div>
  )
  
}
