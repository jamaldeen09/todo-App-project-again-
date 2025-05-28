"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar,faTrashCan,faEdit } from "@fortawesome/free-solid-svg-icons"

interface BookProps {
    id:string,
    bookTitle: string,
    bookAuthor: string,
    bookYear: number,
    onDelete: (id: string) => void
}

const BookItem = (props: BookProps) => {

    // props destructuring
    const { id,bookTitle,bookAuthor,bookYear,onDelete } = props
    const [ favourited,setFavourited ] = useState<boolean>(false);

    const favouriteHandler = () => {
        setFavourited((prevFavourited: boolean) => !prevFavourited)
    }

    const handleDelete = async () => {
        await fetch (`/api/book?id=${id}`, {
            method: "DELETE"
        });
        onDelete(id)
    }

    // font awesome icons
    const star = <FontAwesomeIcon onClick={favouriteHandler} icon={faStar} className={`${favourited ? "text-pink-600" : "text-black"} text-lg hover:scale-105 transition-all hover:cursor-pointer`} />
    const trashCan = <FontAwesomeIcon onClick={handleDelete} icon={faTrashCan} className={`text-red-500 text-lg hover:scale-105 transition-all hover:cursor-pointer`} />
    const edit = <FontAwesomeIcon icon={faEdit} className={`text-lg hover:scale-105 transition-all hover:cursor-pointer hover:text-pink-600`} />

    const icons = [
        star,trashCan,edit
    ]
  return (
    <div className={`rounded-xl h-[55vh] ${favourited ? "bg-yellow-300" : "bg-white"} hover:border-pink-600 transition-all hover:scale-105 flex flex-col items-center py-10
    space-y-10
    border-l-5
    border-b-12
    border-r-12
    border-t-5`}>

        <h1 className="text-2xl font-extrabold text-center px-4">{bookTitle || "None"}</h1>

        <div className="w-full px-10 h-full gap-10 py-10 flex flex-col">
            <h2 className="font-bold text-lg text-gray-500">Author: {bookAuthor || "No Author"}</h2>
            <h3 className="text-lg font-bold text-gray-500">Year: {bookYear || "No Year"}</h3>
        </div>

        <div className="flex justify-between w-full px-20">
            {
                icons.map ((icon, index) => {
                    return  <p key={index}>{icon}</p>
                })
            }
        </div>
    </div>
  )
}

export default BookItem