
import { Suspense, useEffect } from 'react'
import { useSession } from '@/features/auth';
import { NavigationBar } from '@/components/ui/NavigationBar';
import { Toaster } from 'sonner';
import { LoadingDisplay } from '@/components/ui/LoadingDisplay';
import { AppRoutes } from './router';
import { useTheme } from '@/features/account/preferences/hooks';


function App() {

  const { getSession } = useSession();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    getSession();
  }, [getSession])

  useEffect(() => {
    if(isDarkMode){
      document.documentElement.classList.add('dark');
      return;
    }
     document.documentElement.classList.remove('dark');
  }, [isDarkMode])


  

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
