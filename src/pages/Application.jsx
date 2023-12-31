import { useContext, useState } from "react";
import { useEffect } from "react";

import Navbar from "../components/Navbar";
import plusicon from "../assets/plus.png"
import AdminsMap from "../components/AdminsMap";
import { DrawingContextProvider } from "../context/singlemapContext";
import Mapscontext from "../context/mapsContext";
import SideBar from "../components/SideBar";
import http from "../utils/http";
import CreateProjectForm from "../components/creatproject";

function Admin() {
    const { maps,
        loading,
        error,
        createMap,
        deleteMap,
        updateMap,
        selectedmap,
        opencreateprjectScreen,
        createprojectScreenopen,
        setcreateprojectScreenopen,
        setSelectedmap } = useContext(Mapscontext)
        
  
    
    const [syedbr, setSyedbr] = useState(true)

    // rendering 
    return (<div  >
        <Navbar orange={false} small={true} />
        <div className="grid grid-cols-12 w-full  ">
            {syedbr == true && <SideBar  />}
            <div className=" col-span-10 overflow-scroll   w-full min-h-screen-200">
                {!createprojectScreenopen  ? (selectedmap != null ?
                    <DrawingContextProvider>
                        <AdminsMap map={selectedmap} />
                    </DrawingContextProvider> :
                    <div className="flex     bg-gray-200 rounded-lg items-center min-h-screen-200  justify-center   ">
                        <div className="p-2 cursor-pointer select-none  hover:bg-primary px-3 m-1 flex items-center hover:text-black justify-between border-primary border-2 mt-1 rounded-lg text-primary">
                            <div className="mr-3" >
                                Create a  Map
                            </div>
                            <div className=" rounded-full  p-2">
                                <img src={plusicon} alt="" height={20} width={20} />
                            </div>
                        </div>
                    </div>
                ) :
               < CreateProjectForm />}
            </div>
        </div>

    </div>
    );
}

export default Admin;