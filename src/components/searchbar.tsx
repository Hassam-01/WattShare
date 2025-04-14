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
}
