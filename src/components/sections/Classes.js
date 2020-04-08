import React from "react";
import { startOfWeek, endOfWeek } from "date-fns";
import { FormattedMessage } from "gatsby-plugin-intl";
import { Section, Container } from "@components/global";
import ClassesGrid from "@components/common/ClassesGrid";

import googleAPI from "../../utils/googleapi";

/** Get first and last day of week */
let getFirstLastDays = () => {
  const curr = new Date();
  const first = startOfWeek(curr, { weekStartsOn: 1 });
  const last = endOfWeek(curr, { weekStartsOn: 1 });
  return { first, last };
};

class Classes extends React.Component {
  state = {
    events: [],
  };

  componentDidMount() {
    let { first, last } = getFirstLastDays();

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
