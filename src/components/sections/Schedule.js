import React from "react";
import styled from "styled-components";

import { Container } from "@components/global";


class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    let url = process.env.GATSBY_GOOGLE_URL;
    let api_key = process.env.GATSBY_GOOGLE_API;

    fetch(`https://content.googleapis.com/calendar/v3/calendars/${url}/events?key=${api_key}`)
      .then((res) => res.json())
      .then((data) => {
        let events = data.items;
        this.setState({ events });
      })
      .catch(e => console.error(e))
  }

  render() {
    return (
      <HeaderWrapper>
        <Container>
          <div>Calendar test... </div>
          <div>
            {this.state.events && this.state.events.length ?
              this.state.events.map((item) => (
                <div key={item.id}>
                  <p>{item.start.dateTime} - {item.end.dateTime}</p>
                  <p>{item.summary}</p>
                  <p>{item.description}</p>
                  <p>{item.location}</p>
                </div>
              )) :
              null
            }
          </div>
        </Container>
      </HeaderWrapper>
    );
  }
};

const HeaderWrapper = styled.header`
  background-color: ${props => props.theme.color.primary};
`;


export default Schedule;
