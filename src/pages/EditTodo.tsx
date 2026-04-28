
import { useEffect, useState } from "react"
import api from "../utils/axios";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";


type Todo = {
  title:string,
  description:string,
}

const CreateTodo = () => {
  const {id} = useParams()
  const navigate = useNavigate();
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

  const getSingleTodo = async ()=>{
    try {
      const res = await api.get(`/todos/todo/${id}`)
      setValue({
        title:res.data.title,
        description: res.data.description,
      })
    } catch (error) {
      console.error("Get Todo Error:", error);
    }
  }

  const updateTodo = async ()=>{
    const res = await api.put(
      `/todos/update/${id}`,
      value,
    );

    toast.success("Create Todo successfully", {
        position: "top-center",
        theme: "colored",
      });

    console.log(res)

    navigate('/')

    setValue({
        title: "",
        description: "",
      });
  }

  useEffect(()=>{
    getSingleTodo()
  },[id])

  return (
    <div className='w-full h-screen p-5 flex flex-col justify-center items-center'>
      <h2 className='text-3xl font-bold text-center'>Edit Todo</h2>
      <div className='md:w-200 w-full h-full flex flex-col gap-5 md:p-5'>
        <div className='flex flex-col w-full gap-2'>
          <label className='text-xl' htmlFor="title">Title</label>
          <input value={value.title} onChange={handleChange}  name='title' placeholder='Todo Title ' className='w-full px-5 py-3 border rounded-lg text-lg' type="text" />
        </div>

        <div className='flex flex-col w-full gap-2'>
          <label className='text-xl' htmlFor="description">Description</label>
          <input value={value.description} onChange={handleChange} name='description' placeholder='Todo Description ' className='w-full px-5 py-3 border rounded-lg text-lg' type="text" />
        </div>

        <button type="button" onClick={updateTodo} className='border py-3 rounded-lg text-2xl font-bold bg-sky-500 text-white mt-5 hover:bg-blue-700 transition-all duration-300 cursor-pointer'>Edit Todo</button>
      </div>
    </div>
  )
}

export default CreateTodo