import styled from "styled-components";
import HomeButton from "../../components/Button/HomeButton";
import FriendsIcon from "../../assets/images/icons/Friends_icon.svg";
import ShareIcon from "../../assets/images/icons/Share_icon.svg";

const FooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 156px;
  background: linear-gradient(
    0deg,
    rgba(255, 0, 0, 0.25) 0%,
    rgba(110, 0, 0, 0) 100%
  );

  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  z-index: 100;
`;

const LeftButton = styled.button`
  width: 195px;
  height: 90px;

  border: none;
  outline: none;

  background: #fff9f9;
  border-top-right-radius: 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const RightButton = styled.button`
  width: 195px;
  height: 90px;

  border: none;
  outline: none;

  background: #fff9f9;
  border-top-left-radius: 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const CenterWrapper = styled.div`
  position: absolute;

  left: 50%;
  top: 0;

  transform: translate(-50%, 30%);
`;

const Icon = styled.img`
  width: 28px;
  height: 28px;

  margin-bottom: 6px;
`;

const Label = styled.span`
  font-size: 13px;
  font-weight: 600;

  color: #ff8383;
`;

function Footer() {
  return (
    <FooterContainer>
      <LeftButton>
        <Icon src={FriendsIcon} />
        <Label>FRIENDS</Label>
      </LeftButton>

      <CenterWrapper>
        <HomeButton mode="recordStart" />
      </CenterWrapper>

      <RightButton>
        <Icon src={ShareIcon} />
        <Label>SHARE</Label>
      </RightButton>
    </FooterContainer>
  );
}

export default Footer;
