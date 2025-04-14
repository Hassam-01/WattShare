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
}
