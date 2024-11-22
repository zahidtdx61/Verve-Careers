import Banner from "@/components/Banner/Banner";
import JobSection from "@/components/JobSection/JobSection";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Bloom Hire | Home</title>
      </Helmet>
      <div>
        <Banner />
        <JobSection />
      </div>
    </>
  );
};

export default Home;
