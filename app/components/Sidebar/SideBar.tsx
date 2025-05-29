"use client"
import { activate } from "@/app/redux/Modal/ModalActivation";
import { useDispatch,useSelector } from "react-redux";
import { activateTrig,deactivateTrig } from "@/app/redux/completed/TriggerShow";
import { activateAll,deactivateAll } from "@/app/redux/allTrigger/allTrig";
import { activateFav,deactivateFav } from "@/app/redux/favourite/favTrigger"
import { activateUncompleted,deactivateUncompleted } from "@/app/redux/uncompleted/uncompletedTrig";

const SideBar = () => {
    const dispatch = useDispatch();
    
    const completedTasksTrigger = () => {
        dispatch(activateTrig())
        dispatch(deactivateAll())
        dispatch(deactivateFav())
        dispatch(deactivateUncompleted())
    }

    const allTasksTrigger = () => {
        dispatch(activateAll())
        dispatch(deactivateTrig())
        dispatch(deactivateFav())
        dispatch(deactivateUncompleted())
    }

    const favouriteTasksTrigger = () => {
        dispatch(activateFav())
        dispatch(deactivateTrig())
        dispatch(deactivateAll())
        dispatch(deactivateUncompleted())
    }

    const uncompletedTrigger = () => {
        dispatch(activateUncompleted())
        dispatch(deactivateTrig())
        dispatch(deactivateAll())
        dispatch(deactivateFav())
    }
  return (
    <div className="col-span-1 sideBarBg py-10 flex flex-col space-y-16">

        {/* SideBar Title */}
        <div className="min-h-32 w-full flex flex-col items-center space-y-6">

            <h1 className="text-2xl font-extrabold text-white">
                TO-DO-LIST
            </h1>

            {/* Add task button */}
            <div className="w-full flex justify-center">
                <button onClick={() => dispatch(activate())} className="bg-purple-500 w-64 py-3 rounded-md hover:scale-105 hover:brightness-90
                active:brightness-75 transition-all hover:cursor-pointer text-white font-bold
                ">
                    Add Task
                </button>
            </div>
        </div>

        {/* List Items */}
        <div style={{listStyleType: "none"}} 
        className="min-h-1/2 text-white flex flex-col justify-between gap-16">
            <p onClick={allTasksTrigger} className={`listItemsEffect px-10 py-6 hover:cursor-pointer`}>All Tasks</p>
            <p onClick={completedTasksTrigger} className={`listItemsEffect px-10 py-6 hover:cursor-pointer`}>Completed Tasks</p>
            <p onClick={uncompletedTrigger} className={`listItemsEffect px-10 py-6 hover:cursor-pointer`}>Uncompleted Tasks</p>
            <p onClick={favouriteTasksTrigger} className={`listItemsEffect px-10 py-6 hover:cursor-pointer`}>Favourite Tasks</p>
        </div>

    
    </div>
  )
}

export default SideBar