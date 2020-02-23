import React from "react";

import { FormattedMessage } from "gatsby-plugin-intl";
import { Section, Container } from "@components/global";
import ClassesGrid from "@components/common/ClassesGrid";


let getFirstLastDays = () => {
  // get current date
  const curr = new Date;
  // First day is the day of the month - the day of the week/ hask for JS 0 for sunday
  let current_day = curr.getDay() ? curr.getDay() + 1 : 7;
  const first = curr.getDate() - current_day;
  // last day is the first day + 6
  const last = first + 6;
  return {
    first: new Date(curr.setDate(first)).setHours(0,0,0),
    last: new Date(curr.setDate(last)).setHours(24,0,0),
  };
}


class Classes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    let url = process.env.GATSBY_GOOGLE_CALENDAR_NAME;
    let api_key = process.env.GATSBY_GOOGLE_API_KEY;

    fetch(`https://content.googleapis.com/calendar/v3/calendars/${url}/events?key=${api_key}`)
      .then((res) => res.json())
      .then((data) => {
        let { first, last } = getFirstLastDays();

        if (!data.items)
          return;

        // generate date objects and make simple date structure
        data.items.forEach((item) => {
            item.date_start = new Date(item.start.dateTime);
            item.date_end = new Date(item.end.dateTime);
        });

        // filter events & generate date objects - only this week
        let events =  data.items
          .filter((item) => (item.date_start >= first && item.date_end <= last))
          .sort((a, b) => (a.date_start > b.date_start));

        this.setState({ events });
      })
      .catch((e) => console.error(e))
  }

  render() {
    return (
      <Section id="classes">
        <Container>
          <h1><FormattedMessage id="classes" /></h1>
          <ClassesGrid classes={this.state.events} />
        </Container>
      </Section>
    );
  }
};


export default Classes;
