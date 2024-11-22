import Banner from "@/components/Banner/Banner";
import JobSection from "@/components/JobSection/JobSection";
import Newsletter from "@/components/Newsletter/Newsletter";
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

        <Newsletter />
      </div>
    </>
  );
};

export default Home;
