import React from "react";
import { startOfWeek, endOfWeek } from "date-fns";
import { FormattedMessage } from "gatsby-plugin-intl";
import { Section, Container } from "@components/global";
import ClassesGrid from "@components/common/ClassesGrid";

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
    let url = process.env.GATSBY_GOOGLE_CALENDAR_NAME;
    let api_key = process.env.GATSBY_GOOGLE_API_KEY;
    fetch(
      `https://content.googleapis.com/calendar/v3/calendars/${url}/events?key=${api_key}`
    )
      .then(res => res.json())
      .then(data => {
        if (!data.items) return;

        let { first, last } = getFirstLastDays();
        let events = data.items
          // filter cancelled events
          .filter(item => item.status !== "cancelled")
          // generate date objects and make simple date structure
          .map(item => ({
            ...item,
            date_start: new Date(item.start.dateTime),
            date_end: new Date(item.end.dateTime),
          }))
          // filter events & generate date objects - only this week
          .filter(item => item.date_start >= first && item.date_end <= last)
          .sort((a, b) => a.date_start > b.date_start);

        this.setState({ events });
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
