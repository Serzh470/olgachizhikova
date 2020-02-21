import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { FormattedMessage, useIntl } from "gatsby-plugin-intl";
import { Section, Container } from "@components/global";
import EventItem from "@common/EventItem";


export default () => {
    const data = useStaticQuery(graphql`
      query {
        allMarkdownRemark(
          sort:{ order:DESC, fields:[frontmatter___date] },
          limit:5,
          filter: {frontmatter: {content: { ne:true }}}
          ) {
          edges {
            node {
              html
              id
              frontmatter {
                title
                date
                hidden
              }
            }
          }
        }
      }
    `);

    const { locale } = useIntl()
    const options = { year:"numeric", month:"long", day:"numeric" };
    const { edges:events } = data.allMarkdownRemark;
    const rendered_events = events
      .filter((post) => !post.node.frontmatter.hidden)
      .map(({ node:post }) => {
        let date = new Date(post.frontmatter.date);
        return (
          <EventItem title={`${post.frontmatter.title},  ${date.toLocaleDateString(locale, options)}`} key={post.id}>
            <div dangerouslySetInnerHTML={{ __html:post.html }} />
          </EventItem>
        );
    });

    return (
      <Section id="events">
        <Container>
          <h1><FormattedMessage id="upcoming_events" /></h1>
          {rendered_events.length ?
            rendered_events :
            <div><FormattedMessage id="no_upcoming_events" /></div>
          }
        </Container>
      </Section>
    )
};
