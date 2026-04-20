import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
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
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}
