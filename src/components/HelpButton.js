import { BsChat } from "react-icons/bs";


export default function HelpButton() {
  return (
    <button className="fixed right-4 bottom-6 flex items-center gap-2 bg-customRed text-white font-semibold px-4 py-2 rounded-full shadow-custom  hover:bg-customRed transition duration-300">
      <BsChat className="text-xl text-white"size={20} /> Chat
    </button>
  );
}
