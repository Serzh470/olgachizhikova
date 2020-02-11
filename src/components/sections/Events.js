import React from "react";
import { StaticQuery, graphql } from "gatsby";

import { Section, Container } from "@components/global";
import EventItem from "@common/EventItem";


const Events = () => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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
            <h1 style={{ marginBottom: 40 }}>Upcoming Events</h1>
            {rendered_events.length ? rendered_events : <div>No upcoming events...</div>}
          </Container>
        </Section>
      )}
    }
  />
);


export default Events;