import PropTypes from "prop-types";

const Slide = ({ image }) => {
  return (
    <div
      className="w-full h-full gap-8 absolute top-1 left-0 z-10 text-center flex flex-col items-center justify-center rounded-lg overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <h1 className="text-5xl text-slate-50 tracking-wide  font-lexend select-none hover:scale-105 transition-transform ease-in duration-800">
        Bloom <span className="">Hire</span>
      </h1>
      <p className="text-zinc-200 font-medium tracking-tight leading-tight w-[90%] md:w-[70%] lg:w-[55%]">
        Explore thousands of opportunities tailored just for you. Whether you're
        starting fresh or aiming for the next big step, we connect you with top
        employers and help you land your dream job. Your journey to success
        begins here! 🌟
      </p>
    </div>
  );
};

Slide.propTypes = {
  image: PropTypes.string,
};

export default Slide;
