import React from "react";
import styled from "styled-components";
import { useIntl } from "gatsby-plugin-intl";


const ClassFrame = styled.div`
  width: 100%;
  border: 1px solid #ABA8AF;;
  border-radius: 5px;
  grid-auto-flow: dense;
  padding: 5px;
  background-image: linear-gradient(-222deg, #FF8494, #ffa9b7);
  box-shadow: 0px 0px 52px -18px rgba(0, 0, 0, 0.75);
  grid-column:${({ day }) => day} / ${({ day }) => (day + 1)};
`;



const Class = ({
  class: { summary, location, date_start, date_end }
  }) => {
  const { locale } = useIntl();
  const date = { year:"numeric", month:"long", day:"numeric" };
  const time = { hour:"2-digit", minute:"2-digit" };

  return (
    <ClassFrame day={date_start.getDay()}>
        <h4>{summary}</h4>
        {/* <h5>{date_start.toLocaleDateString(locale, date)}</h5> */}
        <h5>{date_start.toLocaleTimeString(locale, time)} - {date_end.toLocaleTimeString(locale, time)}</h5>
        <h5>{location}</h5>
    </ClassFrame>
  );
};

export default Class;