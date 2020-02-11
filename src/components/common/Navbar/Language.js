import React from "react"
import styled from "styled-components";
import { IntlContextConsumer, changeLocale } from "gatsby-plugin-intl"


const languageName = {
  ru: "RU",
  en: "EN",
};


export const LangItem = styled.a`
  margin: 0 0.75em;
  font-family: ${(props) => props.theme.font.secondary};
  ${(props) => props.theme.font_size.small};

  text-decoration: none;
  opacity: 0.7;
  color: ${(props) => props.theme.color.black.regular};

  &.active {
      opacity: 1;
  }
`;


const Language = () => {
  return (
    <div>
      <IntlContextConsumer>
        {({ languages, language: currentLocale }) =>
          languages.map((language) => (
            <LangItem
                key={language}
                className={language === currentLocale ? "active" : ""}
                onClick={() => changeLocale(language)}
            >
              {languageName[language]}
            </LangItem>
          ))
        }
      </IntlContextConsumer>
    </div>
  );
}

export default Language
