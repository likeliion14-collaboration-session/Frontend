import { useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import CommonButton from "../../components/Button/CommonButton";

import home from "../../assets/images/icons/House.svg";
import building from "../../assets/images/icons/House.svg";
import spoon from "../../assets/images/icons/House.svg";
import coffee from "../../assets/images/icons/House.svg";
import shopping from "../../assets/images/icons/House.svg";
import flower from "../../assets/images/icons/House.svg";
import soccer from "../../assets/images/icons/House.svg";
import culture from "../../assets/images/icons/House.svg";
import star from "../../assets/images/icons/House.svg";
import heart from "../../assets/images/icons/House.svg";

const API_BASE_URL = "http://localhost:8080";
const USER_ID = 1;

const pinIcons = [
  { name: "home", image: home },
  { name: "building", image: building },
  { name: "spoon", image: spoon },
  { name: "coffee", image: coffee },
  { name: "shopping", image: shopping },
  { name: "flower", image: flower },
  { name: "soccer", image: soccer },
  { name: "culture", image: culture },
  { name: "star", image: star },
  { name: "heart", image: heart },
];

export default function PhotoUpload() {
  const inputRef = useRef(null);
  const frameRef = useRef(null);

  const [step, setStep] = useState("select");

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [photoId, setPhotoId] = useState(null);

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const [comment, setComment] = useState("");
  const [selectedPinIcon, setSelectedPinIcon] = useState("home");

  const isDragging = useRef(false);
  const start = useRef({ x: 0, y: 0 });

  const getLimitedPos = (nextX, nextY, nextScale = scale) => {
    const frameSize = frameRef.current.offsetWidth;

    const currentWidth = imageSize.width * nextScale;
    const currentHeight = imageSize.height * nextScale;

    const maxX = Math.max((currentWidth - frameSize) / 2, 0);
    const maxY = Math.max((currentHeight - frameSize) / 2, 0);

    return {
      x: Math.min(Math.max(nextX, -maxX), maxX),
      y: Math.min(Math.max(nextY, -maxY), maxY),
    };
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const img = new Image();

    img.src = url;

    img.onload = () => {
      const frameWidth = frameRef.current.offsetWidth;
      const minSide = Math.min(img.width, img.height);
      const ratio = frameWidth / minSide;

      setImageFile(file);
      setImageUrl(url);
      setImageSize({
        width: img.width * ratio,
        height: img.height * ratio,
      });

      setScale(1);
      setPos({ x: 0, y: 0 });
      setStep("preview");
    };
  };

  const handleWheel = (e) => {
    if (!imageUrl || step !== "preview") return;

    e.preventDefault();

    setScale((prev) => {
      const next = prev - e.deltaY * 0.001;
      const limitedScale = Math.min(Math.max(next, 1), 4);

      setPos((currentPos) =>
        getLimitedPos(currentPos.x, currentPos.y, limitedScale),
      );

      return limitedScale;
    });
  };

  const handleMouseDown = (e) => {
    if (!imageUrl || step !== "preview") return;

    isDragging.current = true;

    start.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || step !== "preview") return;

    const nextX = e.clientX - start.current.x;
    const nextY = e.clientY - start.current.y;

    setPos(getLimitedPos(nextX, nextY));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleUploadPhoto = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await axios.post(`${API_BASE_URL}/photos`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setPhotoId(res.data.data.photoId);
      setStep("edit");
    } catch (error) {
      console.error("사진 업로드 실패:", error);
    }
  };

  const handlePatchPhoto = async () => {
    if (!photoId) return;

    try {
      const res = await axios.patch(`${API_BASE_URL}/photos/${photoId}`, {
        userId: USER_ID,
        comment,
        pinIcon: selectedPinIcon,
      });

      console.log("사진 등록 완료:", res.data);
    } catch (error) {
      console.error("사진 정보 수정 실패:", error);
    }
  };

  return (
    <Page>
      <PhotoFrame
        ref={frameRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {!imageUrl ? (
          <CommonButton
            text="앨범에서 사진 가져오기"
            onClick={() => inputRef.current.click()}
          >
            앨범에서 사진 가져오기
          </CommonButton>
        ) : (
          <>
            <PreviewImage
              src={imageUrl}
              alt="업로드한 사진"
              draggable={false}
              $scale={scale}
              $x={pos.x}
              $y={pos.y}
              $width={imageSize.width}
              $height={imageSize.height}
            />

            {step === "edit" && (
              <>
                <DarkOverlay />

                <CommentInput
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="텍스트를 입력해 주세요"
                />

                <SelectedPin>
                  <img
                    src={
                      pinIcons.find((pin) => pin.name === selectedPinIcon)
                        ?.image
                    }
                    alt={selectedPinIcon}
                  />
                </SelectedPin>
              </>
            )}
          </>
        )}

        <HiddenInput
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleSelectImage}
        />
      </PhotoFrame>

      {step === "preview" && (
        <>
          <GuideText>사진을 프레임에 맞게 조정해보세요</GuideText>

          <Submit>
            <CommonButton text="등록" onClick={handleUploadPhoto}>
              등록
            </CommonButton>
          </Submit>
        </>
      )}

      {step === "edit" && (
        <>
          <PinList>
            {pinIcons.map((pin) => (
              <PinItem
                key={pin.name}
                type="button"
                $selected={selectedPinIcon === pin.name}
                onClick={() => setSelectedPinIcon(pin.name)}
              >
                <img src={pin.image} alt={pin.name} />
              </PinItem>
            ))}
          </PinList>

          <Submit>
            <CommonButton text="등록" onClick={handlePatchPhoto}>
              등록
            </CommonButton>
          </Submit>
        </>
      )}
    </Page>
  );
}

const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #fff;
  padding-top: 88px;
`;

const PhotoFrame = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #e5e5e5;
  overflow: hidden;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  touch-action: none;
`;

const PreviewImage = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;

  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;

  transform-origin: center;
  transform: translate(-50%, -50%)
    translate(${({ $x }) => $x}px, ${({ $y }) => $y}px)
    scale(${({ $scale }) => $scale});

  user-select: none;
  cursor: grab;
`;

const DarkOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.45);
`;

const CommentInput = styled.input`
  position: absolute;
  top: 45%;
  left: 50%;
  z-index: 3;

  width: 80%;
  transform: translateX(-50%);

  border: none;
  outline: none;
  background: transparent;

  color: white;
  text-align: center;
  font-size: 14px;

  &::placeholder {
    color: white;
  }
`;

const SelectedPin = styled.div`
  position: absolute;
  left: 50%;
  bottom: -29px;
  z-index: 3;

  width: 58px;
  height: 58px;
  transform: translateX(-50%);

  border: 2px solid #f3a1a1;
  border-radius: 50%;
  background: white;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }
`;

const PinList = styled.div`
  margin-top: 48px;
  padding: 0 24px;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
  justify-items: center;
`;

const PinItem = styled.button`
  width: 48px;
  height: 48px;

  border-radius: 50%;
  border: ${({ $selected }) =>
    $selected ? "2px solid #f3a1a1" : "1px solid #ddd"};

  background: white;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  img {
    width: 26px;
    height: 26px;
    object-fit: contain;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const GuideText = styled.p`
  margin: 27px 0 0;
  text-align: center;
  color: #9a9a9a;
  font-size: 16px;
`;

const Submit = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 63px;
`;
