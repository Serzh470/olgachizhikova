import React from "react";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";
import { FormattedMessage } from "gatsby-plugin-intl";
import Img from "gatsby-image";

import { Section, Container } from "@components/global";

const About = () => (
  <StaticQuery
    query={graphql`
      query {
        about_photo: file(relativePath: { eq: "about_photo.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 760) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <Section id="about">
        <Container>
          <Grid>
            <div>
              <h2>
                <FormattedMessage id="about" />
              </h2>
              <p>
                <FormattedMessage id="about_text" />
              </p>
            </div>
            <Art>
              <Img fluid={data.about_photo.childImageSharp.fluid} />
            </Art>
          </Grid>
        </Container>
      </Section>
    )}
  />
);

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 40px;
  text-align: right;
  align-items: center;
  justify-items: center;
  margin: 24px 0;

  ${props =>
    props.inverse &&
    `
    text-align: left;
    grid-template-columns: 2fr 3fr;
  `}

  h2 {
    margin-bottom: 16px;
  }

  @media (max-width: ${props => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    text-align: left;
    margin-bottom: 96px;

    &:last-child {
      margin-bottom: 24px;
    }

    ${props =>
      props.inverse &&
      `
        ${Art} {
          order: 2;
        }
    `}
  }
`;

const Art = styled.figure`
  margin: 0;
  max-width: 380px;
  width: 100%;
`;

export default About;
