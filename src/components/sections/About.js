import React from "react";
import styled from "styled-components";
import { graphql, useStaticQuery } from "gatsby";
import { useIntl } from "gatsby-plugin-intl";
import Img from "gatsby-image";

import { Section, Container } from "@components/global";
import EventItem from "@common/EventItem";

export default () => {
  const intl = useIntl();
  const data = useStaticQuery(graphql`
      query {
        about_photo: file(relativePath: { eq: "about_photo.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 760) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }

        about_text: allMarkdownRemark(filter:{ frontmatter:{ title: { eq: "about" } } }) {
          edges {
            node {
              id
              frontmatter {
                title
                lang
              }
              html
            }
          }
        }

        about_details: allMarkdownRemark(filter:{ frontmatter:{ title: { eq: "about_details" } } }) {
          edges {
            node {
              id
              frontmatter {
                title
                lang
              }
              html
            }
          }
        }

      }
    `);

  const about = data.about_text.edges.find((item) => item.node.frontmatter.lang === intl.locale);
  const about_details = data.about_details.edges.find((item) => item.node.frontmatter.lang === intl.locale);

  return (
    <Section id="about">
      <Container>
        <Grid>
          <Art>
            <Img fluid={data.about_photo.childImageSharp.fluid} />
          </Art>

          <div>
            <h2>{intl.formatMessage({ id:"about" })}</h2>
            <div>
              {about ? <div dangerouslySetInnerHTML={{ __html:about.node.html }} /> : null}
              {about_details ?
                <EventItem title={intl.formatMessage({ id:"details" })}>
                 <div dangerouslySetInnerHTML={{ __html:about_details.node.html }} />
                </EventItem> :
                intl.formatMessage({ id:"about_text" })
              }
            </div>
          </div>

        </Grid>
      </Container>
    </Section>
  )
}


const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-gap: 40px;
  text-align: left;
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

  p {
    font-size: 20px;
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
