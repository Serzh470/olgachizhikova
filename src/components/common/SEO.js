import React from "react";
import Helmet from "react-helmet";

const SEO_DATA = {
  description: "Personal homepage of Olga Chizhikova. Youga teacher.",
  title: "Yoga with Olga",
  url: "www.olgachizhikova.ru",
  author: "Olga Chizhikova",
  keywords: ["site", "yoga"],
  img: "",
};

const SEO = () => {
  return (
    <Helmet>
      <meta property="fb:app_id" content={SEO_DATA.facebookId} />
      <meta property="og:title" content={SEO_DATA.title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SEO_DATA.url} />
      <meta property="og:image" content={SEO_DATA.img} />
      <meta property="og:description" content={SEO_DATA.description} />

      <meta name="description" content={SEO_DATA.description} />
      <meta name="keywords" content={SEO_DATA.keywords.join(", ")} />
      <meta name="author" content={SEO_DATA.author} />
      <title>{SEO_DATA.title}</title>
      <html lang="en" />
    </Helmet>
  );
};

export default SEO;
