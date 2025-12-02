
import { Suspense, useEffect } from 'react'
import { useSession } from '@/features/auth';
import { NavigationBar } from '@/components/ui/NavigationBar';
import { Toaster } from 'sonner';
import { LoadingDisplay } from '@/components/ui/LoadingDisplay';
import { AppRoutes } from './router';


function App() {

  const { getSession } = useSession();

  useEffect(() => {
    getSession();
  }, [getSession])
  

  return (
    <div className="relative">
      <NavigationBar />
      <Toaster position="top-center" />
      <Suspense fallback={<LoadingDisplay />}>
       <AppRoutes />
      </Suspense>
    </div>
  );
}

export default App
