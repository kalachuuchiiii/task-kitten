import type { JSX } from "react";


export const AuthLayout = ({ children }:{children: JSX.Element}) => {


    return (
      <div className="min-h-screen w-full  flex items-center justify-center ">
       <div className="max-w-sm w-full">
          {children}
       </div>
      </div>
    );
}