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
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      const { edges:posts } = data.allMarkdownRemark;
      return (
        <Section id="events">
          <Container>
            <h1 style={{ marginBottom: 40 }}>Upcoming Events</h1>
            {posts
              .map(({ node: post }) => {
                return (
                  <EventItem title={`${post.frontmatter.title},  ${post.frontmatter.date}`} key={post.id}>
                    {post.excerpt}
                  </EventItem>
                );
            })}
          </Container>
        </Section>
      )}
    }
  />
);


export default Events;