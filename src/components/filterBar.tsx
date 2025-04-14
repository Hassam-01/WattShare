export default function FilterBar() {
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