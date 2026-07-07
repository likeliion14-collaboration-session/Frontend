import styled from "styled-components";

import PlusIcon from "../../assets/images/icons/Plus_icon.svg";
import PowerIcon from "../../assets/images/icons/Power_icon.svg";
import HomeIcon from "../../assets/images/icons/Home_icon.svg";

const ICONS = {
  recordStart: PowerIcon,
  cardCreate: PlusIcon,
  goHome: HomeIcon,
};

const StyledButton = styled.button`
  width: 72px;
  height: 72px;

  border: none;
  border-radius: 50%;

  background: #ff8383;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  box-shadow: 0 0 5px rgba(110, 0, 0, 0.5);

  transition: 0.2s;
`;

const Icon = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
`;

function CenterButton({ mode = "recordStart", onClick, ...props }) {
  return (
    <StyledButton onClick={onClick} {...props}>
      <Icon src={ICONS[mode]} alt={mode} />
    </StyledButton>
  );
}

export default CenterButton;
