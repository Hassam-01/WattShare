import { useState } from "react";
import Button from "../compoundedComponent/Button";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full z-80 bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-md">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="text-3xl font-bold text-yellow-400">WattShare</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Button text="Login" onClick={() => {}} className="primary" />
          <Button text="Signup" onClick={() => {}} className="secondary" />
          <Button text="Contact" onClick={() => {}} className="tertiary" />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-yellow-400 focus:outline-none px-3 py-2 border rounded border-yellow-400 hover:bg-yellow-400 hover:text-gray-900 transition"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 shadow-lg rounded-b-lg">
          <div className="px-6 py-4 space-y-4">
            <a
              href="#"
              className="block text-yellow-400 text-lg font-medium hover:text-blue-400 transition"
            >
              Login
            </a>
            <a
              href="#"
              className="block text-yellow-400 text-lg font-medium hover:text-blue-400 transition"
            >
              Signup
            </a>
            <a
              href="#"
              className="block text-yellow-400 text-lg font-medium hover:text-blue-400 transition"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
