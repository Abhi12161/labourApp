import { Outlet } from 'react-router';
import { AuthProvider } from '../providers/AuthProvider';
import { LanguageProvider } from '../providers/LanguageProvider';

export function AppLayout() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </LanguageProvider>
  );
}
