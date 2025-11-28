
import { Suspense, useEffect } from 'react'
import './App.css'
import { LoadingDisplay } from './components/ui/LoadingDisplay'
import { NavigationBar } from './components/ui/NavigationBar'
import { Toaster } from 'sonner'
import { useSession } from './features/auth/hooks/useSession'
import { AppRoutes } from './routes/app.routes'


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
