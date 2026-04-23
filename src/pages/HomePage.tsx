import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/authStore";

const HomePage = () => {
  type Todo ={
    _id:string;
    title:string;
    description:string
    completed:boolean
  }
  const [data,setData]= useState<Todo[]>([])
  const token = useAuthStore.getState().accessToken;
  const getTodo = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/todos/todo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);
  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center h-full p-5">
      <h2 className="w-full text-2xl font-semibold">Todos</h2>
      {
        data.map((item)=>(
          
            <div key={item._id} className="border px-4 py-3 rounded-lg w-full flex justify-between">
                <h2>{item.title}</h2>
                <h2>{item.description}</h2>
            </div>
          
        ))
      }
    </div>
  );
};

export default HomePage;
