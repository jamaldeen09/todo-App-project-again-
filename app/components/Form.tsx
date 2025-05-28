"use client"
import { useState,useEffect,useRef } from "react" 

const Form = () => {
    // handle ref
    const focusRef = useRef(null);
    useEffect (() => {
        focusRef?.current?.focus()
    }, [])

    // error state management
    const [ titleErr,setTitleErr ] = useState<string>("");
    const [ authorErr,setAuthorErr ] = useState<string>("");
    const [ yearErr,setYearErr ] = useState<string>("");

    // input field state management
    const [ title,setTitle ] = useState<string>("");
    const [ author,setAuthor ] = useState<string>("");
    const [ year,setYear ] = useState<string>("");

    // onChange functions
    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle((prevTitle: string) => event.target.value)
    }
    const handleAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthor((prevAuthor: string) => event.target.value)
    }
    const handleYear = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYear((prevYear) => event.target.value)
    }

    // create POST request

    const createNewBook = async () => {
      try {
        const request = await fetch("/api/book", {
            method: "POST",
            body: JSON.stringify(
                { title: title, author: author, year: parseInt(year),id: crypto.randomUUID() }
            ),
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (!request.ok) throw new Error ("Something went wrong");

        const responseData = await request.json();
        console.log(
            `Submitted: ${responseData}`
        )
      } catch (err){
        console.error(err)
      }
    }
    // Book creation function
    const handleNewBook = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const realYear = parseInt(year);
        if (!title) {
            setTitleErr((prevTitleErr: string) => "Title must be at least 1 character")
            return;
        } else if (!author) {
            setAuthorErr ((prevAuthorErr: string) => "Author's name must be at least 1 character")
        } else if (!year) {
            setYear((prevYear: string) => "Year must be at least 1450")
        } else if (isNaN(realYear)) {
            setYearErr((prevYearErr: string) => "Year must be a number")
        } else {
            setAuthorErr((prevAuthorErr: string) => "")
            setYearErr((prevAuthorErr: string) => "")
            setTitleErr((prevAuthorErr: string) => "")

            createNewBook();

            setAuthor((prevAuthor: string) => "");
            setYear((prevYear: string) => "");
            setTitle((prevTitle: string) => "");
        }
    }

   
  return (
    <form onSubmit={handleNewBook} className="w-full bg-WHITE max-w-lg min-h-[50vh] rounded-xl shadow-xl hover:border-pink-600 
    transition-all py-10 flex flex-col space-y-10
    border-l-5
    border-b-12
    border-r-12
    border-t-5
    sm:max-w-xl">
        
        {/* FORM TITLE */}
        <div className="w-full h-fit text-center">
            <h1 className="text-2xl font-extrabold">
                Create A Book
            </h1>
        </div>

        {/* BOOK CREATION */}
        <div className="w-full flex flex-col items-center space-y-6">
             
            {/* title */}
            <div className="w-full max-w-sm flex flex-col items-center space-y-2">
                <input value={title} onChange={handleTitle} ref={focusRef} type="text" className="w-full border border-gray-500 rounded-lg shadow-xl h-16 px-6 font-extrabold" 
                placeholder="Title"/>

                <p className="text-red-600">{titleErr}</p>
            </div>

            {/* author */}
            <div className="w-full max-w-sm flex flex-col items-center space-y-2">
                <input  value={author} onChange={handleAuthor} type="text" className="w-full border border-gray-500 rounded-lg shadow-xl h-16 px-6 font-extrabold" 
                placeholder="Author"/>
              
              <p className="text-red-600">{authorErr}</p>
            </div>

            {/* year */}
            <div className="w-full max-w-sm flex flex-col items-center space-y-2">
                <input value={year} onChange={handleYear} type="number" className="w-full border border-gray-500 rounded-lg shadow-xl h-16 px-6 font-extrabold" 
                placeholder="Year"/>

                <p className="text-red-600">{yearErr}</p>
            </div>
        </div>

        {/* BOOK SUBMISSION */}
        <div className="w-full flex justify-center">
            <button className="w-full hover:bg-pink-600 text-white bg-black px-6 py-3 rounded-lg shadow-xl font-extrabold
            hover:cursor-pointer hover:scale-105 active:brightness-75 transition-all
            max-w-fit">

                Create
            </button>
        </div>
    </form>
  )
}

export default Form