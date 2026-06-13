import Header from "./Header";

export default function MainLayout({ children }) {
  return (
    <div className="layout">


      <div className="main-content">

        <Header />

        {children}

      </div>

    </div>
  );
}