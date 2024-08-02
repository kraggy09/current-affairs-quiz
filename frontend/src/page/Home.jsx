import { AiFillThunderbolt } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import Slider from "../components/ui/Slider";

const Home = () => {
  return (
    <main className="">
      <nav className="flex items-center justify-between pt-3">
        <div className="flex gap-x-3 items-center">
          <div id="image" className="w-12 h-12 rounded-full bg-white"></div>
          <div className="text-sm">
            <p>Kaif Shaikh</p>
            <p className="px-2 text-center rounded-lg bg-white">Expert</p>
          </div>
        </div>
        <div className="flex px-1 rounded-lg py-1 items-center justify-center bg-white">
          <span className="bg-sky-500 py-1 px-1 mr-1 rounded-lg">
            <AiFillThunderbolt size={20} color="white" />
          </span>
          <p id="points">1200</p>
        </div>
      </nav>
      <section className="rounded-lg px-3 min-h-[30vh] backdrop-blur-md items-center flex justify-around bg-white/30 bg-opacity-50 my-3 backdrop-filter">
        <figure
          id="random-img"
          className="rounded-lg text-center min-w-[40%] md:min-w-[30%] lg:min-w-[20%] min-h-[25vh] backdrop-blur-md bg-white/30 bg-opacity-50 my-3 backdrop-filter"
        ></figure>
        <article className="min-h-[25vh] flex gap-y-6 flex-col items-start justify-between">
          <h1 className="text-xl text-white font-bold">Daily Task</h1>
          <h2 className="text-white">15 Questions</h2>
          <p className="bg-white px-2 py-1 rounded-lg">30 Jul 2024</p>
        </article>
        <button className="bg-white p-2 hover:cursor-pointer rounded-full">
          <FaPlay className="text-sky-500" />
        </button>
      </section>
      <Slider />
    </main>
  );
};

export default Home;
