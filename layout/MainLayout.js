import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </>
  );
}
