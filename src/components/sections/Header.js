import React from "react";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import header_logo from "../../images/header_logo.svg";

const Header = () => (
  <StaticQuery
    query={graphql`
      query {
        header_photo: file(relativePath: { eq: "header_photo.png" }) {
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }

        header_logo: file(relativePath: { eq: "header_logo.svg" }) {
          childImageSharp {
            fluid(maxWidth: 1400) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `}
    render={(data) => (
      <HeaderWrapper>
        <Art>
          <Img fluid={data.header_photo.childImageSharp.fluid} />
          <Logo src={header_logo} alt="logo" />
        </Art>
      </HeaderWrapper>
    )}
  />
);

const HeaderWrapper = styled.header`
  background-color: ${(props) => props.theme.color.primary};
  padding-top: 80px;
  padding-bottom: 128px;

  @media (max-width: ${(props) => props.theme.screen.md}) {
    padding-top: 81px;
  }
`;

const Art = styled.figure`
  position: relative;
  width: 100%;
  margin: 0;

  > div {
    width: 100%;

    @media (max-width: ${(props) => props.theme.screen.md}) {
      width: 100%;
    }
  }
`;

const Logo = styled.img`
  position: absolute;
  left: 0;
  top: 5%;
  width: 30%;
  height: 60%;
`;

export default Header;
