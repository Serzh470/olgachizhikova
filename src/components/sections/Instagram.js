import React from "react";
import styled from "styled-components";
import { graphql, StaticQuery } from "gatsby";
import Image from "gatsby-image";
import { FormattedMessage } from "gatsby-plugin-intl";

import { Section, Container } from "@components/global";

const Instagram = () => (
  <StaticQuery
    query={graphql`
      query InstagramPosts {
        allInstagramContent(limit: 8) {
          edges {
            node {
              link
              localImage {
                childImageSharp {
                  fluid(maxHeight: 500, maxWidth: 500, quality: 50) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                }
              }
              images {
                standard_resolution {
                  width
                  height
                  url
                }
                low_resolution {
                  url
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => (
      <Section id="inspiration">
        <Container>
          <h1>
            <FormattedMessage id="inspiration" />
          </h1>
          <Grid>
            {data.allInstagramContent.edges.map((item, i) =>
              item.node.localImage ? (
                <Photo key={i}>
                  <a
                    href={item.node.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex="0"
                  >
                    <Image fluid={item.node.localImage.childImageSharp.fluid} />
                  </a>
                </Photo>
              ) : (
                <div></div>
              )
            )}
          </Grid>
        </Container>
      </Section>
    )}
  />
);

const Grid = styled.div`
  width: 100%;
  background: #ffffff;
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr 1fr;
  grid-gap: 15px;

  @media (max-width: ${(props) => props.theme.screen.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${(props) => props.theme.screen.xs}) {
    grid-template-columns: 1fr;
    padding: 10vw;
  }
`;

const Photo = styled.div`
  box-shadow: -5px 5px 10px 0px #cccccc;
  transition: all 0.3s ease-in-out;
  opacity: 0.8;

  &:hover {
    transform: scale(1.05);
    opacity: 1;
  }
`;

export default Instagram;
