window.addEventListener('error', (event) => {
  const error = event.error
  const stack = error?.stack || ''

  // Try to extract file + line + column
  const match = stack.match(/(\/src\/.*?\.(t|j)sx?):(\d+):(\d+)/)

  const location = match
    ? `${match[1]}:${match[3]}:${match[4]}`
    : 'Unknown location'

  // Try to extract component/function name
  const componentMatch = stack.match(/at (\w+)/)
  const component = componentMatch?.[1] ?? 'Unknown component'

  document.body.innerHTML = `
    <div style="
      padding:20px;
      font-family:monospace;
      background:#0f172a;
      color:#fca5a5;
      height:100vh;
    ">
      <h2 style="color:#ef4444">Runtime Error</h2>

      <p><strong>Component:</strong> ${component}</p>
      <p><strong>Location:</strong> ${location}</p>

      <pre style="
        margin-top:16px;
        padding:12px;
        background:#020617;
        color:#e5e7eb;
        overflow:auto;
      ">${stack}</pre>
    </div>
  `

})


import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './app/App';
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);
