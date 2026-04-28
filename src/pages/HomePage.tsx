import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import TodoCart from "../components/common/TodoCart";
import api from "../utils/axios";

const HomePage = () => {
  type Todo = {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
  };
  
  const [data, setData] = useState<Todo[]>([]);
  const getTodo = async () => {
    try {
      const res = await api.get(`/todos/todo`,);
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id: string) => {
  setData((prev) => prev.filter((todo) => todo._id !== id));
};


  useEffect(() => {
    getTodo();
  }, []);
  return (
    <div className="w-full flex flex-col gap-4 items-center h-screen p-5">
      <h2 className="w-full text-2xl font-semibold md:ml-203">Todos</h2>
      {data.length === 0 ? (
        <div className="h-fit w-full flex flex-col items-center gap-4 text-center px-4">
          <h2 className="text-3xl font-bold">No Todos Yet</h2>

          <p className="text-gray-500 max-w-md">
            You haven't created any tasks yet. Start organizing your day by
            creating your first todo.
          </p>

          <NavLink
            to="/createTodo"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Create Your First Todo
          </NavLink>
        </div>
      ) : (
        <div className="w-full h-fit items-center flex gap-6 flex-col">
          {
            data.map((item) => <TodoCart onDelete={handleDelete} item={item}/>)
          }
        </div>
      )}
    </div>
  );
};

export default HomePage;
