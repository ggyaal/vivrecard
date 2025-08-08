import ISO6391 from "iso-639-1";
import styled from "styled-components";

const Container = styled.div`
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #276eac;
  border-radius: 30px;
`;

const LanguageLabel = ({ code }: { code: string }) => {
  const nativeName = ISO6391.getNativeName(code);
  return <Container>{nativeName.length > 0 ? nativeName : "없음"}</Container>;
};

export default LanguageLabel;
