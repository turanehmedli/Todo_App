import { Pen } from "lucide-react";

const EditButton = () => {
  return (
    <button className="bg-green-500 p-2 rounded-lg hover:p-2.5 ease-in-out duration-200 hover:bg-green-700">
      <Pen />
    </button>
  );
};

export default EditButton;
