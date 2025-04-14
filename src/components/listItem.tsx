interface ListItemProps {
  name: string;
  address: string;
  pricePerKwh: number;
  availableKwh: number;
}

export default function ListItem({
  name,
  address,
  pricePerKwh,
  availableKwh,
}: ListItemProps) {
  return (
    <div
      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-3 bg-white"
      onClick={() => alert("Contacting seller...")}
    >
      <div className="flex items-center gap-4">
        <div className="bg-blue-600 p-2 rounded-full w-10 h-10 flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4V20M4 12H20"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-blue-900">{name}</h3>
          <p className="text-gray-500 text-sm">{address}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-bold text-blue-900">${pricePerKwh}/kWh</p>
          <p className="text-gray-500 text-sm">
            {availableKwh.toLocaleString()} kWh
          </p>
        </div>
      </div>
    </div>
  );
}
