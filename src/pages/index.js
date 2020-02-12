import React from "react";

import Layout from "@common/Layout";
import Navbar from "@common/Navbar";

import Header from "@sections/Header";
import About from "@sections/About";
import Instagram from "@sections/Instagram";
import Events from "@sections/Events";
import Footer from "@sections/Footer";


const IndexPage = () => (
  <Layout>
    <Navbar />
    <Header />
    <About />
    <Instagram />
    <Events />
    <Footer />
  </Layout>
);

export default IndexPage;
