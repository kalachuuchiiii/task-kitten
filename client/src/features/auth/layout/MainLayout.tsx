import type React from "react";



const MainLayout = ({ message = 'Welcome back !!', children = null}: {message: string, children: React.ReactNode}) => {

    return (
      <div className="w-full align-x h-screen align">
        <div className="w-6/12 bg-linear-to-br align-y text-indigo-100  from-blue-800 to-purple-700 h-full relative">
         <div className="align-x my-4">
          

          <h1 className="text-3xl hover:underline font-bold align-x">
            {message}
          </h1>
         </div>
          <div className="flex justify-between  items-center backdrop-brightness-150 p-6 w-full">
            <img src="/cat25.gif" className="size-12" />
                <img src="/cat23.gif" className="size-12" />
            <img src="/cat6.gif" className="size-12" />
            <img src="/cat30.gif" className="size-12" />

            <img src="/cat79.gif" className="size-12" />
          </div>
        </div>
        <div className=" h-full overflow-auto flex flex-col items-center justify-center w-6/12 p-4 ">
          {children}
        </div>
      </div>
    );
}

export default MainLayout;