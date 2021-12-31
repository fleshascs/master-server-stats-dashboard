import NavBar from './NavBar';
import Footer from './Footer';
// import Meta from './Meta';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      {/* <Meta /> */}
      <NavBar />
      <div className='min-h-screen md:container'>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
