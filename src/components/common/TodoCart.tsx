import { Delete, Pen, Trash } from "lucide-react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { NavLink } from "react-router";

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TodoProps {
  item: Todo;
  onDelete: (id: string) => void;
}

const TodoCart = ({ item, onDelete }: TodoProps) => {
  return (
    <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-md border">
      <h3 className="text-xl font-semibold text-black">{item.title}</h3>
      <p className="text-gray-600 mt-2">{item.description}</p>
      <span
        className={`inline-block mt-3 px-3 py-1 rounded-full text-sm ${
          item.completed
            ? "bg-green-100 text-green-500"
            : "bg-yellow-100 text-yellow-600"
        }`}
      >
        {item.completed ? "Completed" : "Pending"}
      </span>

      <div className="flex gap-4 mt-3">
        <DeleteButton
          onDelete={onDelete}
          id={item._id}
          key={item._id}
        />
        
        <NavLink to={`/editTodo/${item._id}`}>
          <EditButton
           
        />
        </NavLink>
      </div>
    </div>
  );
};

export default TodoCart;
