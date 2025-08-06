import styled from "styled-components";

const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => !["size"].includes(prop),
})<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  padding: 5px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const Avatar = ({ url, size = 50 }: { url: string; size?: number }) => {
  return (
    <Container size={size}>
      <Image src={url} alt="Avatar" />
    </Container>
  );
};

export default Avatar;
