import { IoMdHome } from "react-icons/io";
import { IoMdTrophy } from "react-icons/io";
import { IoMdBookmark } from "react-icons/io";
import { FaUser } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex lg:hidden  min-w-full items-center min-h-[10vh] rounded-t-[30px] bg-white justify-around absolute right-0 bottom-0">
      <div className="flex flex-col items-center justify-center">
        <IoMdHome size={25} color="gray" />
        <p className="text-sm text-gray-400 mt-2">Home</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <IoMdTrophy size={25} color="gray" />
        <p className="text-sm text-gray-400 mt-2">Leaderboard</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <IoMdBookmark size={25} color="gray" />
        <p className="text-sm text-gray-400 mt-2">Bookmark</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <FaUser size={25} color="gray" />
        <p className="text-sm text-gray-400 mt-2">User</p>
      </div>
    </footer>
  );
};

export default Footer;
