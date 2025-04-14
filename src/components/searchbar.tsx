<<<<<<< HEAD
import { IoSearch } from "react-icons/io5";

export default function SearchBar() {
    return (
      <div className="flex items-center bg-gray-100 rounded-md px-3 h-10 w-full">
        <input
          type="text"
          placeholder="Search for solar energy..."
          className="flex-grow bg-transparent focus:outline-none text-sm"
        />
        <IoSearch className="text-gray-500" size={18} />
      </div>
    );
=======
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className={`border border-gray-300 rounded-lg flex items-center h-16 px-4 py-2 w-full justify-center`}>
      <input
        type="text"
        placeholder="Search..."
        className="w-[90%] h-10 px-4  rounded-lg focus:outline-none outline-none"
      />
      <FaSearch className="text-gray-500 " size={20} />
    </div>
  );
>>>>>>> styling
}
