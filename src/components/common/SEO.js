import React from "react";
import Helmet from "react-helmet";
import FontUrl1 from "../../fonts/corinthia.ttf";
import FontUrl2 from "../../fonts/whipsmart.ttf";

const SEO_DATA = {
  title: "Yoga with Olga Chizhikova",
  url: "www.olgachizhikova.ru",
  author: "Sergey Matyushkov <serzh.matyushkov@gmail.com>",
  img: "",
};

const SEO = ({ description, title, lang, keywords }) => (
  <Helmet>
    <meta property="og:title" content={title} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={SEO_DATA.url} />
    <meta property="og:image" content={SEO_DATA.img} />
    <meta property="og:description" content={description} />
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="author" content={SEO_DATA.author} />
    <title>{title}</title>
    <html lang={lang} />
    <link
      rel="preload"
      as="font"
      href={FontUrl1}
      type="font/truetype"
      crossOrigin="anonymous"
    />
    <link
      rel="preload"
      as="font"
      href={FontUrl2}
      type="font/truetype"
      crossOrigin="anonymous"
    />
  </Helmet>
);

export default SEO;
