import styled from "styled-components";

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

const LikeAndComment = () => {
  return (
    <MainListContentP>
      <MainListLikeButton>0</MainListLikeButton>
      <MainListLikeButton>댓글</MainListLikeButton>
    </MainListContentP>
  );
};

export default LikeAndComment;
