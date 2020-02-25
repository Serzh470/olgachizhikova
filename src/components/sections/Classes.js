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
      calendars: [
        {
          name: "Classes",
          url: process.env.GATSBY_GOOGLE_CALENDAR_NAME,
        },
      ],
      dailyRecurrence: 90,
      weeklyRecurrence: 12,
      monthlyRecurrence: 3,
    };

    googleAPI
      .getAllCalendars(calendar_configuration)
      .then((raw_events) => {
        let events = raw_events
          .filter((item) => item.start >= first && item.end <= last)
          .sort((a, b) => a.start > b.start);

        this.setState({ events });
      })
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
