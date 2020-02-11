import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { FormattedMessage } from "gatsby-plugin-intl";
import { Section, Container } from "@components/global";
import EventItem from "@common/EventItem";


const Events = () => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(sort:{ order:DESC, fields:[frontmatter___date] }, limit:5) {
          edges {
            node {
              excerpt
              id
              frontmatter {
                title
                date(formatString: "DD MMMM YYYY")
                hidden
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      const { edges:events } = data.allMarkdownRemark;
      const rendered_events = events
        .filter((post) => !post.node.frontmatter.hidden)
        .map(({ node:post }) => {
          return (
            <EventItem title={`${post.frontmatter.title},  ${post.frontmatter.date}`} key={post.id}>
              {post.excerpt}
            </EventItem>
          );
      });

      return (
        <Section id="events">
          <Container>
            <h1 style={{ marginBottom: 40 }}>
              <FormattedMessage id="upcoming_events" />
            </h1>
            {rendered_events.length ?
              rendered_events :
              <div><FormattedMessage id="no_upcoming_events" /></div>
            }
          </Container>
        </Section>
      )}
    }
  />
);


export default Events;