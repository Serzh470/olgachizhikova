import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import { useIntl } from "gatsby-plugin-intl";
import SEO from "@common/SEO";
import theme from "@styles/theme";
import GlobalStyles from "@styles/GlobalStyles";

const Layout = ({ children }) => {
  const intl = useIntl();
  return (
    <ThemeProvider theme={theme}>
      <>
        <SEO
          lang={intl.locale}
          title={intl.formatMessage({ id: "title" })}
          keywords={intl.formatMessage({ id: "keywords" })}
          description={intl.formatMessage({ id: "description" })}
        />
        <GlobalStyles />
        {children}
      </>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
