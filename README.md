<p align="center">
    <img alt="Homepage Logo" src="./src/images/header_logo.svg" width="60" />
</p>
<h1 align="center">
  Personal Homepage Project
</h1>


1.  **General info**

    Project based on gatsby starters:
    * [Gatsby default starter](https://github.com/gatsbyjs/gatsby-starter-default)
    * [Gatsby absurd starter](https://github.com/ajayns/gatsby-absurd)

2.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd my-default-starter/
    gatsby develop
    ```

3.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── .env.development
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5. **`env.development`**: Contained variables for development enviroment. Variables are injected in JS code. Not hosted in git
    * `GATSBY_INSTAGRAM_TOKEN`. [Fast way to get yours](http://instagram.pixelunion.net/)
    * `GATSBY_GOOGLE_CALENDAR_NAME`. Calendar ID ****@group.calendar.google.com. Get yours in google calendar settings
    * `GATSBY_GOOGLE_API_KEY`. [Add new api for access public google calendar](https://console.developers.google.com/apis/credentials)

6.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

7.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

8.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

9.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

10.  **`LICENSE`**: Gatsby is licensed under the MIT license.

11. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

12. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

13. **`README.md`**: A text file containing useful reference information about your project.


## 💫 Deploy

[![Netlify Status](https://api.netlify.com/api/v1/badges/475c6fc0-1f8b-46a3-b11a-f7c9c167c57b/deploy-status)](https://app.netlify.com/sites/vigilant-neumann-7cf192/deploys)

I am using Netlify for deploying this project and Netlify CMS for contant management. More information about this you can find here:
   * [Gatsby docs](https://www.gatsbyjs.org/docs/deploying-to-netlify/)
   * [Netlify docs](https://www.netlify.com/blog/2016/02/24/a-step-by-step-guide-gatsby-on-netlify/)
