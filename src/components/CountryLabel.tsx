import styled from "styled-components";
import countries from "i18n-iso-countries";
import koLocale from "i18n-iso-countries/langs/ko.json";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(koLocale);
countries.registerLocale(enLocale);

interface CountryLabelProps {
  isoCode: string;
  locale?: "en" | "ko";
  showEmoji?: boolean;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid ${({ theme }) => theme.content.tag.blue.border};
  background-color: ${({ theme }) => theme.content.tag.blue.background};
  color: ${({ theme }) => theme.content.tag.blue.text};
  border-radius: 30px;
`;

const Flag = styled.div`
  margin-right: 5px;
`;

const Text = styled.div``;

function countryCodeToEmoji(code: string): string {
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
}

const CountryLabel = ({
  isoCode,
  locale = "ko",
  showEmoji = false,
}: CountryLabelProps) => {
  return (
    <Container>
      {showEmoji && <Flag>{countryCodeToEmoji(isoCode)}</Flag>}
      <Text>{countries.getName(isoCode, locale) ?? isoCode}</Text>
    </Container>
  );
};

export default CountryLabel;
