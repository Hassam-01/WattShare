type ButtonProps = {
    text: string;
    onClick: () => void;
    className?: string;
};

    // 3 main type of buttons (primary, secondary, tertiary)
    // primary: text-white border-white
    // secondary: text-white bg-yellow-400 border-yellow-400
    // tertiary: text-white bg-blue-500 border-blue-500

export default function Button({ text, onClick, className }: ButtonProps) {
    // Button styles
    const buttonType = className?.includes("primary")
        ? "border-2 border-white text-white bg-transparent hover:bg-white hover:text-black cursor-pointer"
        : className?.includes("secondary")
        ? "bg-yellow-400 text-white border-yellow-400 hover:bg-yellow-800 cursor-pointer"
        : className?.includes("tertiary")
        ? "bg-blue-700 text-white border-blue-700 hover:bg-blue-800 cursor-pointer"
        : "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300";    

    return (
        <button
            onClick={onClick}
            className={`z-100 px-4 py-2 rounded-lg font-semibold transition duration-300 ease-in-out shadow-md ${buttonType} ${className}`}
        >
            {text}
        </button>
    );
}