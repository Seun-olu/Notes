import Image from "next/image";
import Logo from "../Assets/icons/Frame.png";

const Navbar = () => {
  return (
    <div className=" w-full flex  h-[80px] md:grid grid-cols-2 bg-[#202124] border-b border-b-[#4f5257]">
      <div className=" flex gap-4 w-[250px] px-4 justify-center items-center">
        <p className=" text-white text-center place-items-center font-bold text-[30px] ">NOTES APP</p>
      </div>
    </div>
  );
};

export default Navbar;
