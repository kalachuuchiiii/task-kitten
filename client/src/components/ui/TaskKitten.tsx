import { NavLink } from "react-router-dom";


export const TaskKitten = ({ size = 20 }: { size?: number }) => {
  return (
    <p className={`flex z-10 items-center gap-2 text-center tracking-tight `}>
      <img src="/cat37.gif" className={`size-${size}`} />{" "}
      <NavLink to = '/' className="font-bold hover:underline">
        Tas<span className="text-indigo-600">kitten</span>
      </NavLink>
    </p>
  );
};