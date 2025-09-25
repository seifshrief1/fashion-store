import React from "react";
import Hero from "../../components/Hero";
import NewArrivals from "../../components/NewArrivals";
import Categories from "../../components/Categories";
import WhyChooseUs from "../../components/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Hero />
      <WhyChooseUs />
      <Categories />
      <NewArrivals />
    </div>
  );
};

export default Home;
