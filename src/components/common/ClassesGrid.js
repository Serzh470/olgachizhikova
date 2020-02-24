import React from "react";
import styled from "styled-components";
import Class from "@components/common/Class";
import { FormattedMessage } from "gatsby-plugin-intl";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-gap: 25px;
  align-items: start;
  justify-items: center;
  grid-template-areas:
    "mo tu we"
    "th fr sa"
    ". su .";

  .class {
    width: 100%;
    text-align: center;
  }

  .mo {
    grid-area: mo;
  }
  .tu {
    grid-area: tu;
  }
  .we {
    grid-area: we;
  }
  .th {
    grid-area: th;
  }
  .fr {
    grid-area: fr;
  }
  .sa {
    grid-area: sa;
  }
  .su {
    grid-area: su;
  }

  @media (max-width: ${props => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    grid-template-areas: "mo" "tu" "we" "th" "fr" "sa" "su";
  }
`;

const ClassesGrid = ({ classes }) => {
  let week_days = ["su", "mo", "tu", "we", "th", "fr", "sa"];

  return (
    <Grid>
      {week_days.map((day, i) => {
        let day_classes = classes.filter(el => el.date_start.getDay() === i);
        return (
          <div key={i} className={`class ${day}`}>
            <h2>
              <FormattedMessage id={day} />
            </h2>
            {day_classes && day_classes.length ? (
              day_classes.map((el, i) => <Class class={el} key={day + i} />)
            ) : (
              <p>
                <FormattedMessage id="no_classes_today" />
              </p>
            )}
          </div>
        );
      })}
    </Grid>
  );
};

export default ClassesGrid;
