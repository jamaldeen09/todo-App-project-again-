import Nav from "./components/Nav"
import Form from "./components/Form"
import DisplayArea from "./components/DisplayArea"

const page: React.FC = () => {
  return (
    <>
      <Nav />
      <div className="min-h-screen flex justify-center items-center flex-col space-y-20">
          <Form />
          <DisplayArea />
      </div>
    </>
  )
}

export default page