import { NavLink } from "react-router-dom";
import { TaskKitten } from "../components/ui/TaskKitten";

const LandingPage = () => {

  return (
    <div className=" w-full flex flex-col items-center justify-center text-center p-8">
      <div className="flex flex-col items-center justify-center space-y-6 w-full max-w-2xl">
        <p className="text-sm opacity-80">Kalachuuchiiii's</p>

        <div className="text-4xl  ">
          <TaskKitten  size={20} />
        </div>

        <p className="text-sm max-w-xl text-neutral-400">
          Imagine having a team of{" "}
          <span className="text-indigo-500">adorable</span>,{" "}
          <span className="text-indigo-800">Whiskered assistants</span> keeping
          your day on track. Let these furry little managers guide your day, one
          purr at a time.
        </p>

        <NavLink
          to="/sign-up"
          className="button-bg my-10 px-8 py-2.5 rounded-lg text-xs"
        >
          Get Started!
        </NavLink>
      </div>
    </div>
  );
};

export default LandingPage;
