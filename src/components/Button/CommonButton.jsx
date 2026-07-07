import styled from "styled-components";

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: fit-content;
  height: 48px;
  padding: 12px 40px;

  border: 3px solid #ffa7a7;
  border-radius: 90px;

  background: #fff9f9;
  box-shadow: 0 4px 4px 0 rgba(110, 0, 0, 0.2);

  font-size: 20px;
  font-weight: 600;
  color: #333;

  white-space: nowrap;
  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background: #fff5f3;
  }
`;

const CommonButton = ({ children, onClick, ...props }) => (
  <Button onClick={onClick} {...props}>
    {children}
  </Button>
);

export default CommonButton;
