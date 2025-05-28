"use client"
export const revalidate  = 2;

import { useState,useEffect } from 'react'
import BookItem from './BookItem'

const DisplayArea = () => {
    
    const [ books,setBooks ] = useState([]);

    const getBooks = async () => {
        const request = await fetch ("/api/book", {
            method: "GET",
        })
        const data = await request.json();
        setBooks(data);
    }
    useEffect (() => {
        getBooks();
    }, [])

    
  return (
    <>
    {/* MAIN AREA TITLE */}
    <div className="text-4xl w-full text-center font-extrabold pt-10">
        Books
    </div>
    {/* BOOK SEARCHING */}
    <div className="px-20 w-full flex space-x-10">
        <input type="text" placeholder="Search" className="font-extrabold h-16 w-96 rounded-xl shadow-xl px-5 border border-gray-500"/>
        <button className="w-full hover:bg-pink-600 text-white bg-black px-6 py-3 rounded-lg shadow-xl font-extrabold
            hover:cursor-pointer hover:scale-105 active:brightness-75 transition-all
            max-w-fit">

                Search
        </button>
    </div>

    {/* display area */}
    <div className="min-h-screen p-10 gap-6 w-full
    grid 
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-3">

        {
            books?.map((book, index) => {
                return <BookItem  onDelete={(deletedid) => {
                    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== deletedid))
                }} id={book.id} key={book.id} bookTitle={book.title} bookAuthor={book.author} bookYear={book.year}/>
            })
        }
    </div>
    </>
  )
}

export default DisplayArea