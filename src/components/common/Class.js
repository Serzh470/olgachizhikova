import React from "react";
import styled from "styled-components";
import { useIntl } from "gatsby-plugin-intl";


const ClassFrame = styled.div`
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  text-align: center;
  padding: 15px;
  margin: 0 auto;
  margin-bottom: 25px;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`;



const Class = ({
  class: { summary, location, date_start, date_end }
  }) => {
  const { locale } = useIntl();
  const date = { year:"numeric", month:"short", day:"numeric" };
  const time = { hour:"2-digit", minute:"2-digit" };

  return (
    <ClassFrame day={date_start.getDay()}>
        <p>{summary}</p>
        <p>
          {`${date_start.toLocaleTimeString(locale, time)} -
          ${date_end.toLocaleTimeString(locale, time)},
          ${date_start.toLocaleDateString(locale, date)}`}
        </p>
        <p className="location" title={location}>{location}</p>
    </ClassFrame>
  );
};

export default Class;