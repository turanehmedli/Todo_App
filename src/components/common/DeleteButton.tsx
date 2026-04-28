import { Trash } from "lucide-react";
import api from "../../utils/axios";
import { toast } from "react-toastify";

interface DeleteButtonProps {
  id: string;
  onDelete: (id: string) => void;
}

const DeleteButton = ({ id, onDelete }: DeleteButtonProps) => {
  const deleteBTN = async () => {
    try {
      await api.delete(`/todos/delete/${id}`);
      onDelete(id);

      toast.success("Delete Todo successfully", {
        position: "top-center",
        theme: "colored",
      });
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <button
      onClick={deleteBTN}
      className="bg-red-500 p-2 rounded-lg hover:scale-105 duration-200 hover:bg-red-700 text-white"
    >
      <Trash />
    </button>
  );
};

export default DeleteButton;
