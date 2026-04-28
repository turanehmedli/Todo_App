
import { useState } from "react"
import api from "../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";


type Todo = {
  title:string,
  description:string,
}

const CreateTodo = () => {
  const navigation = useNavigate()
  
   const [value, setValue] = useState<Todo>({
    title: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  const createTodo = async ()=>{
    const res = await api.post(
      "/todos/todo/new",
      value,
    );

     toast.success("Create Todo successfully", {
        position: "top-center",
        theme: "colored",
      });

      navigation('/')

    console.log(res)

    setValue({
        title: "",
        description: "",
      });
  }
  return (
    <div className='w-full h-screen p-5 flex flex-col justify-center items-center'>
      <h2 className='text-3xl font-bold text-center'>Create Todo</h2>
      <div className='md:w-200 w-full h-full flex flex-col gap-5 md:p-5'>
        <div className='flex flex-col w-full gap-2'>
          <label className='text-xl' htmlFor="title">Title</label>
          <input value={value.title} onChange={handleChange}  name='title' placeholder='Todo Title ' className='w-full px-5 py-3 border rounded-lg text-lg' type="text" />
        </div>

        <div className='flex flex-col w-full gap-2'>
          <label className='text-xl' htmlFor="description">Description</label>
          <input value={value.description} onChange={handleChange} name='description' placeholder='Todo Description ' className='w-full px-5 py-3 border rounded-lg text-lg' type="text" />
        </div>

        <button type="button" onClick={createTodo} className='border py-3 rounded-lg text-2xl font-bold bg-sky-500 text-white mt-5 hover:bg-blue-700 transition-all duration-300 cursor-pointer'>Create Todo</button>
      </div>
    </div>
  )
}

export default CreateTodo