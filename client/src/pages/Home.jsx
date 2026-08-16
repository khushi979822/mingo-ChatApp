import React from "react";
import Hero from "../components/Hero";
import FeaturedPreview from "../components/FeaturedPreview";
import FeatureGrid from "../components/FeatureGrid";
import GroupShowcase from "../components/GroupShowcase";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div
      className="theme-transition"
      style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}
    >
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
