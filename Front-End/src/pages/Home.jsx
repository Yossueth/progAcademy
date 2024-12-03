import ComHome from "../components/comHome";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { jwtDecode } from "jwt-js-decode";
import AcademyProvider from "../components/Context/AcademyProvider";

const Home = () => {
  const tokenEnciptado = sessionStorage.getItem("token");

  const token = jwtDecode(tokenEnciptado);
  return (
    <AcademyProvider>
      <Navbar userRole={token.payload.rol} />
      <ComHome />
      <Footer />
    </AcademyProvider>
  );
};

export default Home;
