import { useNavigate } from "react-router-dom";
import solarBG from "../assets/landingBG.jpg";
import Navbar from "../components/navbar";
import Button from "../compoundedComponent/Button";

export default function LandingPage() {
    const navigate = useNavigate();
  return (
    <div className="relative h-screen w-full flex flex-col">
       {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${solarBG})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6 sm:px-10 md:px-20">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg leading-tight">
          Welcome to <span className="text-yellow-400">WattShare</span>
        </h1>
        <p className="text-white text-base sm:text-lg md:text-xl mt-4 max-w-3xl drop-shadow-md">
          Join us in revolutionizing the way we share and consume solar energy.
          Empower communities by making clean energy accessible to everyone.
        </p>
        <Button 
          text="Explore" 
          onClick={() => navigate("/home")} 
          className="mt-6 px-6 py-3 text-lg font-semibold bg-yellow-400 text-white rounded-lg shadow-md hover:bg-yellow-500 transition duration-300"
        />
      </div>
    </div>
  );
}
