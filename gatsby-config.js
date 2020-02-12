const path = require("path");

const activeEnv =  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";
console.log(`Using environment config: '${activeEnv}'`);

// special for development to get tokens
if (activeEnv === "development") {
  require("dotenv").config({
    path: `.env.${activeEnv}`,
  });
}


module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-svgr`,
      options: {
        svgoConfig: {
          plugins: {
            removeViewBox: false,
          },
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/events`,
        name: 'markdown-pages',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: 'markdown-pages',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Yoga with Olga Chizhikova`,
        short_name: `Yoga&Olga`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `static/favicon.svg`,
        icons: [
          {
            src: `/favicons/favicon-32x32.png`,
            sizes: `32x32`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@components": path.resolve(__dirname, "src/components"),
          "@common": path.resolve(__dirname, "src/components/common"),
          "@images": path.resolve(__dirname, "src/images"),
          "@sections": path.resolve(__dirname, "src/components/sections"),
          "@styles": path.resolve(__dirname, "src/styles/"),
          "@static": path.resolve(__dirname, "static/"),
        },
      },
    },
    {
      resolve: `gatsby-source-instagram-all`,
      options: {
        access_token: process.env.GATSBY_INSTAGRAM_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        path: `${__dirname}/src/intl`,
        languages: [`ru`, `en`],
        defaultLanguage: `ru`,
        redirect: true,
        redirectComponent: require.resolve(`./src/components/redirect.js`),
      },
    },
  ],
};
