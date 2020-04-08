import React from "react";
import { FormattedMessage } from "gatsby-plugin-intl";
import { Section, Container } from "@components/global";
import ClassesGrid from "@components/common/ClassesGrid";

import googleAPI from "../../utils/googleapi";
import weekPeriod from "../../utils/weekPeriod";


class Classes extends React.Component {
  state = {
    events: [],
  };

  componentDidMount() {
    const { first, last } = weekPeriod();

    const calendar_configuration = {
      api_key: process.env.GATSBY_GOOGLE_API_KEY,
      url: process.env.GATSBY_GOOGLE_CALENDAR_NAME,
      start: first,
      end: last,
    };

    googleAPI
      .getAllCalendars(calendar_configuration)
      .then(events => this.setState({ events }))
      .catch(err => {
        throw new Error(err);
      });
  }

  render() {
    return (
      <Section id="classes">
        <Container>
          <h1>
            <FormattedMessage id="classes" />
          </h1>
          <ClassesGrid classes={this.state.events} />
        </Container>
      </Section>
    );
  }
}

export default Classes;
