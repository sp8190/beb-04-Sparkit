import styled from "styled-components";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { useState } from "react";
export const MainListContentP = styled.p`
  padding: 4px 0 8px;
  text-align: left;
  &:last-child {
    padding: 0;
  }
`;

export const MainListLikeButton = styled.button`
  outline: none;
  border: none;
  box-shadow: none;
  cursor: pointer;
  background-color: transparent;
  color: #fff;
  padding: 8px 8px 2px;
  &:first-child {
    padding-right: 8px;
  }
  & + button {
    border-left: 1px solid #aaa;
  }
`;

const ContentSpan = styled.span`
  padding: 0 8px;
  height: 14px;
  font-size: 14px;
`;

const ContentDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const heartSvgStyle = {
  width: "13.5px",
  height: "13.5px",
  fill: "#dc495c",
};

const commentSvgStyle = {
  width: "13.5px",
  height: "13.5px",
  filter: "brightness(0) invert(1)",
};

const LikeAndComment = () => {
  const [isLikeClicked, setIsLikeClicked] = useState(false);
  const handleLikeButtonClick = () => {
    setIsLikeClicked((prev) => !prev);
  };
  return (
    <MainListContentP>
      <MainListLikeButton type="button" onClick={handleLikeButtonClick}>
        <ContentDiv>
          {isLikeClicked ? (
            <FaHeart style={heartSvgStyle} />
          ) : (
            <FaRegHeart style={heartSvgStyle} />
          )}
          <ContentSpan>0</ContentSpan>
        </ContentDiv>
      </MainListLikeButton>
      <MainListLikeButton>
        <ContentDiv>
          <GrEdit style={commentSvgStyle} />
          <ContentSpan>댓글</ContentSpan>
        </ContentDiv>
      </MainListLikeButton>
    </MainListContentP>
  );
};

export default LikeAndComment;
