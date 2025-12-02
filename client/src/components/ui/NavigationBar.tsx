

export const NavigationBar = () => {

    return (
      <div className="fixed inset-x-0 top-0 p-10 left-0 w-full">
        <div className="flex items-center justify-between w-fit">
          <img src="/cat37.gif" className="size-8" />{" "}
          <p className="font-bold hover:underline">
            Tas<span className="text-indigo-600">kitten</span>
          </p>
        </div>
      </div>
    );
}