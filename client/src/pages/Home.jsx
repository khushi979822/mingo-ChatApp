import React from "react";
import Hero from "../components/Hero";
import FeaturedPreview from "../components/FeaturedPreview";
import FeatureGrid from "../components/FeatureGrid";
import GroupShowcase from "../components/GroupShowcase";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-[#F7F5F3]">
      <Hero />
      <FeaturedPreview />
      <FeatureGrid />
      <GroupShowcase />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
