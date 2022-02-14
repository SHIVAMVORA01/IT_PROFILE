import React,{useState} from "react";
import dataContext from "./data";
import { getEndPoint } from "../components/request";
const DataContextState=(props)=>{
   const [response,setData]=useState({"name-us":"hello"});
    const getDetails = async ()=>{
       const userData= await getEndPoint('/data', null);
       if(userData){
            setData(userData.data);
            return true;
       }
       else{
           setData({});
        return false;
       }
    };
   return(
       <dataContext.Provider value={{response,getDetails}}>
         {props.children}
       </dataContext.Provider>

   );
}
export default DataContextState;