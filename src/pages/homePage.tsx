import { useState } from "react";
import Navbar from "../components/navbar";
import { IoSearch } from "react-icons/io5";
import { IoGrid } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa";

export function GridAlignment() {
  const [viewType, setViewType] = useState("list"); // "list" or "grid"
  
  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-600 text-sm font-medium">View:</span>
      <div className="flex gap-2 bg-gray-100 p-1 rounded-md">
        <button 
          className={`p-1 rounded ${viewType === 'grid' ? 'bg-white shadow-sm' : ''}`}
          onClick={() => setViewType('grid')}
        >
          <IoGrid className={`${viewType === 'grid' ? 'text-blue-600' : 'text-gray-500'}`} size={18} />
        </button>
        <button 
          className={`p-1 rounded ${viewType === 'list' ? 'bg-white shadow-sm' : ''}`}
          onClick={() => setViewType('list')}
        >
          <FaListUl className={`${viewType === 'list' ? 'text-blue-600' : 'text-gray-500'}`} size={18} />
        </button>
      </div>
    </div>
  );
}

export function Location() {
  const cities = ["Islamabad", "Karachi", "Lahore", "Austin, TX", "San Francisco, CA"];
  const [inputValue, setInputValue] = useState("Islamabad");
  const [filteredCities, setFilteredCities] = useState(cities);
  const [showDropdown, setShowDropdown] = useState(false);

  interface HandleChangeEvent {
    target: {
      value: string;
    };
  }

  const handleChange = (e: HandleChangeEvent): void => {
    const value = e.target.value;
    setInputValue(value);
    setShowDropdown(true);
    setFilteredCities(
      cities.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSelect = (city: string) => {
    setInputValue(city);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center h-10 bg-blue-50 rounded-md px-3">
        <FaLocationDot className="text-blue-600" size={16} />
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
          placeholder="Select Location"
          className="w-32 px-2 bg-blue-50 focus:outline-none text-sm"
        />
        <FaAngleDown className="text-gray-400" size={12} />
      </div>
      {showDropdown && filteredCities.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-md max-h-40 overflow-y-auto">
          {filteredCities.map((city, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-sm"
              onClick={() => handleSelect(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SearchBar() {
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

function FilterBar() {
  return (
    <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg my-4">
      <div className="flex items-center gap-3">
        <span className="font-semibold text-blue-800 text-sm">Filters:</span>
        <div className="flex gap-2">
          <button className="px-4 py-1 bg-white border border-blue-300 rounded-full text-sm text-blue-800">Price</button>
          <button className="px-4 py-1 bg-white border border-blue-300 rounded-full text-sm text-blue-800">Capacity</button>
          <button className="px-4 py-1 bg-white border border-blue-300 rounded-full text-sm text-blue-800">Distance</button>
          <button className="px-4 py-1 bg-white border border-blue-300 rounded-full text-sm text-blue-800">Rating</button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-blue-800 text-sm">Sort by:</span>
        <span className="font-semibold text-blue-800 text-sm">Price ▼</span>
      </div>
    </div>
  );
}

function ListItem({ name, address, pricePerKwh, availableKwh }) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-3 bg-white">
      <div className="flex items-center gap-4">
        <div className="bg-blue-600 p-2 rounded-full w-10 h-10 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4V20M4 12H20" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-blue-900">{name}</h3>
          <p className="text-gray-500 text-sm">{address}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm">Contact</button>
        <div className="text-right">
          <p className="font-bold text-blue-900">${pricePerKwh}/kWh</p>
          <p className="text-gray-500 text-sm">{availableKwh.toLocaleString()} kWh</p>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const listings = [
    {
      name: "EcoSolar Solutions",
      address: "123 Green St, Austin, TX 78701",
      pricePerKwh: 0.12,
      availableKwh: 5000
    },
    {
      name: "SunPower Community",
      address: "456 Solar Ave, Austin, TX 78702",
      pricePerKwh: 0.10,
      availableKwh: 8200
    },
    {
      name: "BrightFuture Energy",
      address: "789 Sunshine Blvd, Austin, TX 78703",
      pricePerKwh: 0.11,
      availableKwh: 3800
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <div className="flex flex-col">
          <div className="bg-blue-700 py-12 px-6 rounded-t-lg text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Buy and Sell Solar Energy</h1>
            <p className="text-blue-100">Connect with local solar energy producers and consumers</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex items-center gap-4">
              <Location />
              <div className="flex-grow">
                <SearchBar />
              </div>
              <GridAlignment />
            </div>
          </div>
          
          <FilterBar />
          
          <div className="space-y-3">
            {listings.map((listing, index) => (
              <ListItem 
                key={index}
                name={listing.name}
                address={listing.address}
                pricePerKwh={listing.pricePerKwh}
                availableKwh={listing.availableKwh}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}