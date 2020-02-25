import React from "react";
import styled from "styled-components";
import { useIntl } from "gatsby-plugin-intl";

const ClassFrame = styled.div`
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  text-align: center;
  padding: 15px;
  margin: 0 auto;
  margin-bottom: 25px;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const Class = ({ class: { title, location, start, end } }) => {
  const { locale } = useIntl();
  const date = { year: "numeric", month: "short", day: "numeric" };
  const time = { hour: "2-digit", minute: "2-digit" };

  return (
    <ClassFrame day={start.getDay()}>
      <p>{title}</p>
      <p>
        {`${start.toLocaleTimeString(locale, time)} -
          ${end.toLocaleTimeString(locale, time)},
          ${start.toLocaleDateString(locale, date)}`}
      </p>
      <h4 title={location}>{location}</h4>
    </ClassFrame>
  );
};

export default Class;
