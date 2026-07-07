import { useRef, useState } from "react";
import styled from "styled-components";
import CommonButton from "../../components/Button/CommonButton";

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

  &:active {
    cursor: grabbing;
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

export default function PhotoUpload() {
  const inputRef = useRef(null);
  const frameRef = useRef(null);

  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [imageSize, setImageSize] = useState({
    width: 0,
    height: 0,
  });

  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const isDragging = useRef(false);
  const start = useRef({ x: 0, y: 0 });

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
    };
  };

  const handleWheel = (e) => {
    if (!imageUrl) return;

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
    if (!imageUrl) return;

    isDragging.current = true;
    start.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    const nextX = e.clientX - start.current.x;
    const nextY = e.clientY - start.current.y;

    setPos(getLimitedPos(nextX, nextY));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleSubmit = () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("image", imageFile);

    console.log("원본 파일:", imageFile);
    console.log("미리보기 상태:", { scale, pos });

    // axios.post("/api/photo", formData);
  };

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
        )}

        <HiddenInput
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleSelectImage}
        />
      </PhotoFrame>

      {imageUrl && (
        <>
          <GuideText>사진을 프레임에 맞게 조정해보세요</GuideText>
          <Submit>
            <CommonButton text="등록" onClick={handleSubmit}>
              등록
            </CommonButton>
          </Submit>
        </>
      )}
    </Page>
  );
}
