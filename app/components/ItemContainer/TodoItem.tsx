import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan,faStar,faEdit } from "@fortawesome/free-solid-svg-icons"
import { useSelector,useDispatch } from "react-redux"
import { removeItem, toggleComplete } from "@/app/redux/ToDo-Essentials/TodoReducer"
import { Payload } from "@/app/redux/ToDo-Essentials/TodoReducer"
import { useState } from "react"
import { addCompletedItem,removeCompletedItem } from "@/app/redux/completed/Completed"
import { addFav,removeFav,toggleFavourite } from "@/app/redux/favourite/favourite"
import { addUncompleted,removeUncompleted } from "@/app/redux/uncompleted/uncompleted"



interface itemProps{
    name: string,
    id: number,
    isCompleted: boolean,
    description: string,
    onDelete: (id: number) => void,
}


const TodoItem = (props: itemProps) => {
    // props
    const { name,id,isCompleted,description,onDelete } = props

    const completed = useSelector (state => state?.complete.completed)
   

    // selector and dispatch
    const container = useSelector(state => state?.container.todoContainer);
    const currId = container.find((item: Payload) => item.id === id)
    const dispatch = useDispatch();

    const handleCompleted = (identifier: number) => {
        dispatch(toggleComplete(identifier))
        
        const updatedItem = {
            ...currId,
            isCompleted: !currId?.isCompleted,
        };
    
        if (updatedItem.isCompleted) {
            dispatch(removeUncompleted(updatedItem.id));
            dispatch(addCompletedItem(updatedItem));
        } else {
            dispatch(removeCompletedItem(updatedItem.id));
            dispatch(addUncompleted(updatedItem))
        }
    }
   
    const favArr = useSelector(state => state?.favourite.favTasks);

    const [ starStyles,setStarStyles ] = useState<boolean>(false);

    const handleFavouriting = () => {
    
        dispatch(toggleFavourite(currId.id))
        const updatedItem = {
            ...currId,
            isFavourite: !currId?.isFavourite
        }
        if (updatedItem.isFavourite) {
           dispatch(addFav(updatedItem));
           setStarStyles((prevStarStyles) => true);
        } else {
            dispatch(removeFav(updatedItem.id))
            setStarStyles((prevStarStyles) => false);
        }
    }
  
    // icons
    const trashCan = <FontAwesomeIcon onClick={() => onDelete(id)} className={`text-red-600 text-xl hover:scale-105 transition-all hover:brightness-75 hover:cursor-pointer`} icon={faTrashCan} />
    const star = <FontAwesomeIcon 
    onClick={handleFavouriting} 
    icon={faStar} 
    className={`${starStyles ? "text-yellow-500" : "text-black"} text-xl hover:scale-105 transition-all hover:cursor-pointer hover:brightness-75 
    `}/>
    const edit = <FontAwesomeIcon icon={faEdit} className={`text-xl hover:scale-105 transition-all hover:cursor-pointer hover:brightness-75`}/>

    // Array of icons
    const icons = [
        star,
        trashCan,
        edit
    ]
  return (
    <div className="sideBarBg flex flex-col justify-between py-6
     hover:bg-purple-500 hover:scale-105 text-white transition-all min-h-80 rounded-xl shadow-xl w-full">

        <div className="px-6 flex flex-col space-y-4">
            {/* Task Description */}
            <h1 className="font-extrabold tracking-wider text-2xl">{name || "None"}</h1>
        
            {/* Task Description */}
            <h2 className="">{description || "None"}</h2>
        </div>

       
        <div className="flex justify-between px-6 items-center">
            
            {/* isCompleted button */}
            <button  onClick={() => handleCompleted(id)} className={`bg-black px-4 py-3 rounded-lg shadow-xl text-white font-extrabold
            hover:scale-105 transition-all hover:brightness-90 active:brightness-75 hover:cursor-pointer
            ${currId.isCompleted ? "bg-green-500" : "bg-orange-400"}`}>
               {currId.isCompleted ? "Completed" : "Uncompleted"}
            </button>

             {/* Icons */}
            <div className="flex space-x-6">
            {icons.map((icon, index) => {
                return <p key={index}>{icon}</p>
            })}
            </div>
        </div>
    </div>
  )
}

export default TodoItem