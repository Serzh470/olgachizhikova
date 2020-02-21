import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "gatsby-plugin-intl";


const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);;
  grid-gap: 15px;
  text-align: left;
  align-items: start;
  grid-auto-flow: dense;
  justify-items: center;
`;


const ClassesGrid = (props) => (
  <Grid>
    <h4 style={{gridColumn:"1/2"}}><FormattedMessage id="mo" /></h4>
    <h4 style={{gridColumn:"2/3"}}><FormattedMessage id="tu" /></h4>
    <h4 style={{gridColumn:"3/4"}}><FormattedMessage id="we" /></h4>
    <h4 style={{gridColumn:"4/5"}}><FormattedMessage id="th" /></h4>
    <h4 style={{gridColumn:"5/6"}}><FormattedMessage id="fr" /></h4>
    <h4 style={{gridColumn:"6/7"}}><FormattedMessage id="sa" /></h4>
    <h4 style={{gridColumn:"7/8"}}><FormattedMessage id="su" /></h4>
    {props.children}
  </Grid>
);


export default ClassesGrid;