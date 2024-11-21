import Banner from "@/components/Banner/Banner";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Bloom Hire | Home</title>
      </Helmet>
      <div>
        <Banner />
      </div>
    </>
  );
};

export default Home;
