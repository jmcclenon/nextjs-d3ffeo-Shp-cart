import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout({ children }) {
  const router = useRouter();

  if (!router.isReady) {
    return null;
  }

  const session = getSession();

  if (!session) {
    router.push('/login');
    return null;
  }

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 bg-gray-100 p-6">{children}</main>
      </div>
    </>
  );
}
