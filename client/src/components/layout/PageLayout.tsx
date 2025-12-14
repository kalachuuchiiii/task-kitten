
export const PageLayout = ({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: React.ReactNode
}) => {
  return (
    <div className="py-12  w-full  ">
      <header className="text-center px-20 mb-10">
        <h1 className="h-full w-full my-2 text-center text-4xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="opacity-80">{description}</p>
      </header>
      <main className="w-full px-10" >
         {children}
      </main>
    </div>
  );
};
