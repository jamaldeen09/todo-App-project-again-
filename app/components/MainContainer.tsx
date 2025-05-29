"use client"
import { deactivate } from "../redux/Modal/ModalActivation";
import { AppDispatch } from "../redux/store";
import TodoItem from "./ItemContainer/TodoItem";
import Sidebar from "./Sidebar/SideBar"
import { useSelector,useDispatch } from "react-redux"
import { addItem,Payload,removeItem } from "../redux/ToDo-Essentials/TodoReducer";
import { useEffect,useState } from "react";
import { nameTyping,resetName } from "../redux/ToDo-Essentials/NameSlice";
import { descriptionTyping,resetDesc } from "../redux/ToDo-Essentials/Description";
import { removeFav } from "../redux/favourite/favourite";
import { removeCompletedItem } from "../redux/completed/Completed";
import { removeUncompleted } from "../redux/uncompleted/uncompleted";




const MainContainer = () => {
    // Getting modal Trigger and dispatcher
    const modalTrigger = useSelector(state => state?.modal.modalActivate);
    const dispatch = useDispatch<AppDispatch>();

    // Getting todo container
    const container = useSelector(state => state?.container.todoContainer);

    // Task and description state management
    const taskName = useSelector(state => state?.taskName.name)
    const description = useSelector (state => state?.desc.description)
    const trigger = useSelector(state => state?.triggerComp.showCompleted)
    const completed = useSelector (state => state?.complete.completed)
    const favouriteTrig = useSelector(state => state.favouriteTrigger.favTrig);


    // handle addingTsk
    const unCompletedTrigger = useSelector(state => state.uncompletedTrigg.uncompletedTrigger)
    const addTask = () => {
       
        const newTask = {
            task: taskName,
            isCompleted: false,
            id: container.length + 1,
            description: description,
            isFavourite: false
        }

       
        dispatch(addItem(newTask))
        dispatch(resetName())
        dispatch(resetDesc())
        dispatch(deactivate())
    }

    const [ addingTrigger,setAddingTrigger ] = useState<boolean>(false)
    useEffect (() => {
        
        if (addingTrigger) {
            addTask();
   
        }
    }, [addingTrigger])

    // handle deleting
    const deleteTask = (identifier: number) => {
        dispatch(removeItem(identifier))
        dispatch(removeFav(identifier))
        dispatch(removeCompletedItem(identifier))
        dispatch(removeUncompleted(identifier))
    }

    // state management for all and favourite array
    const allTrigger = useSelector(state => state?.allTrig.allTrigger);
    const favArr = useSelector(state => state?.favourite.favTasks);
    const uncompletedArr = useSelector (state => state.uncompleted.uncompletedArr)

    
  return (
    <div className="min-h-screen grid
    grid-cols-5">
       <Sidebar />

       {/* Main content */}
       
        <div className="col-span-4 mainBg flex flex-col space-y-10">

            {/* Main Header */}
            <div className="flex justify-between p-10 items-center">
                {/* search input field */}
                <div>
                   <input type="text" placeholder="Search" 
                   className="sideBarBg h-20 w-96 text-white rounded-xl shadow-xl px-10"/>
                </div>

                {/* Project maker */}
                <div>
                   <h1 className="text-gray-500 font-extrabold">Project by Olatunji Jamaldeen</h1>
                </div>
            </div>

            {/* Display Area */}
            <div className="px-10">
                <h1 className="text-3xl text-white font-extrabold">All Tasks: {container.length}</h1>
            </div>
            <div className="w-full min-h-fit grid px-10 py-10 gap-10
            lg:grid-cols-3">
               
               {
                allTrigger ?  container.map((todo: Payload) => {
                    return <TodoItem onDelete={deleteTask} key={todo.id} name={todo.task} id={todo.id} isCompleted={todo.isCompleted} description={todo.description}/>
                }) : trigger ?  completed.map((todo: Payload) => {
                    return <TodoItem onDelete={deleteTask} key={todo.id} name={todo.task} id={todo.id} isCompleted={todo.isCompleted} description={todo.description}/>
                }) :  favouriteTrig ? favArr.map((todo: Payload) => {
                    return <TodoItem onDelete={deleteTask} key={todo.id} name={todo.task} id={todo.id} isCompleted={todo.isCompleted} description={todo.description}/>
                }) :  unCompletedTrigger ? uncompletedArr.map((todo: Payload) => {
                    return <TodoItem onDelete={deleteTask} key={todo.id} name={todo.task} id={todo.id} isCompleted={todo.isCompleted} description={todo.description}/>
                }) : container.map((todo: Payload) => {
                    return <TodoItem onDelete={deleteTask} key={todo.id} name={todo.task} id={todo.id} isCompleted={todo.isCompleted} description={todo.description}/>
                })
               }
            </div>
        </div>

        {/* Modal */}
        <div className={`${modalTrigger ? "flex" : "hidden"} w-full inset-0 absolute bg-black/30
        flex justify-center items-center`}>
             
            <div className="w-full bg-white max-w-xl rounded-xl shadow-xl min-h-96 flex flex-col p-10 space-y-10">

                {/* Modal header */}
                <div className="w-full flex justify-between">

                    <h1 className="font-extrabold text-purple-500 text-3xl">Todo</h1>
                    <button onClick={() => setAddingTrigger(prevAddingTrigger => !prevAddingTrigger)} className="bg-black text-white font-extrabold px-5 py-3 rounded-lg shaodw-md
                    hover:scale-105 hover:brightness-90 active:brightness-75 transition-all hover:cursor-pointer">Add Task</button>
                </div>

                {/* Modal Body */}
                <div className="w-full flex flex-col items-center space-y-4">
                  <textarea value={taskName} onChange={(e) => dispatch(nameTyping(e.target.value))} className="border border-gray-500 p-6 rounded-xl shadow-xl" placeholder="Task Name" rows={2} cols={30}></textarea>
                  <textarea value={description}  onChange={(e) => dispatch(descriptionTyping(e.target.value))}  className="border border-gray-500 p-6 rounded-xl shadow-xl" placeholder="Description" rows={2} cols={30}></textarea>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MainContainer