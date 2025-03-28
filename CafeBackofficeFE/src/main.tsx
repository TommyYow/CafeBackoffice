import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { App as AntApp, Flex, Spin } from 'antd'
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App.tsx'
import './index.css'
import routes from './routes.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AntApp>
      <BrowserRouter>
        <Suspense fallback={
          <Flex justify='center' align='center' style={{ height: '100vh' }}>
            <Spin />
          </Flex>
        }>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<App />}>
                {routes.map((route) => (
                  <Route
                    key={route.key}
                    path={route.path === '/' ? '' : route.path}
                    element={route.element}
                  />
                ))}
              </Route>
            </Routes>
          </QueryClientProvider>
        </Suspense>
      </BrowserRouter>
    </AntApp>
  </StrictMode>,
)
