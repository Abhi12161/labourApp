import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router';
import { useState } from 'react';
import { router } from './routes';
import SplashScreen from './providers/SplashScreen';


export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1565d8',
          colorInfo: '#1565d8',
          colorSuccess: '#0f9d67',
          colorWarning: '#ff9f1a',
          colorError: '#e5484d',
          borderRadius: 18,
          fontFamily: '"Plus Jakarta Sans", "Segoe UI", sans-serif',
        },
      }}
    >
      {loading ? (
        <SplashScreen onFinish={() => setLoading(false)} />
      ) : (
        <RouterProvider router={router} />
      )}
    </ConfigProvider>
  );
}