import bookDatabase from "../database";

export const POST = async ( request: Request ) => {
    const response = await request.json();

    if (!response.title || !response.author) {
        return new Response (
            JSON.stringify ( { message: "Invalid title/author" } ),
            { status: 400 }
        )
    } else if (typeof response.year !== "number" || response.year < 1450) {
        return new Response (
            JSON.stringify( { message: "Year is not valid" }),
            { status: 400 }
        )
    } else {
        bookDatabase.push(response);
        return new Response (
            JSON.stringify( { message: `Succesfully added book`,book: response } ),
            { status: 202 }
        )
    }
}

export const GET = async (request: Request) => {
    return new Response (
        JSON.stringify(bookDatabase),
        { status: 200 }
    )
}

export const DELETE = async (request: Request) => {
    const { searchParams } = new URL (request.url);
    const id = searchParams.get("id");

    const index = bookDatabase.findIndex((book) => book.id === id );
    if (index === -1){
        return new Response (
            JSON.stringify({ message: "Book not found"}), {status: 404}
        )
    }
    bookDatabase.splice(index, 1);
    return new Response (
        JSON.stringify( {message: "Deleted sucessfully"})
    )
}