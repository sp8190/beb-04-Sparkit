import type { NextPage } from "next";
import styled from "styled-components";
import Image, { ImageLoader } from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import sparkLogo from "../assets/sparkLogo.png";
import LikeAndComment, {
  MainListLikeButton,
  MainListContentP,
} from "../components/LikeAndComment";

import { darkTheme } from "../styles/theme";
import { GiAbstract048 } from "react-icons/gi";
import { useRecoilState } from "recoil";
import { postsState } from "../states/spark";

// const GET_TAG_POST = gql`
//   query getTagPost($postId: String!) {
//     post(id: $postId) {
//       id
//       title
//       content
//       like @client
//     }
//   }
// `;

interface Loader {
  src: string;
  width: number;
  quality: number;
}

const myLoader = ({ src, width, quality }: Loader) => {
  return `http://localhost:3000/${src}?w=${width}&q=${quality || 75}`;
};

const Home: NextPage = ({}) => {
  const router = useRouter();
  const [postData] = useRecoilState(postsState);
  const [io, setIo] = useState<IntersectionObserver | null>(null);
  const endList = useRef<HTMLDivElement>(null);
  const mainListDivClick = (title: string, id: number) => {
    router.push(`/detail/${title}/${id}`);
  };

  useEffect(() => {
    const targetIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (io !== null) io.disconnect();
          console.log("hi");
        }
      });
    });
    setIo(targetIO);
  }, []);
  io?.observe(endList.current as Element);
  return (
    <>
      <MainHeadDiv>
        <h1>전체 태그</h1>
      </MainHeadDiv>
      <MainUl>
        {postData &&
          postData?.map((item, index) => {
            let { title } = item;
            title = title ?? "spark";
            return (
              <MainList key={`${item.id + index}`}>
                <MainListP>
                  <MainListSpan>
                    <GiAbstract048 />
                  </MainListSpan>
                  <MainListSpan>{item.writer?.nickname ?? "test"}</MainListSpan>
                  {item.hashtags.map((tag, idx) => {
                    return (
                      <MainListSpan key={tag.hashtag + idx}>
                        {tag.hashtag}
                      </MainListSpan>
                    );
                  })}
                  <MainListTime>{item.created_at}</MainListTime>
                </MainListP>
                <MainListDiv>
                  <MainListImgBox>
                    <Link href={`/detail/${title}/${item.id}`}>
                      <LinkA>
                        <Image
                          loader={myLoader as ImageLoader}
                          src={sparkLogo}
                          alt="logo image"
                          width={120}
                          height={120}
                        />
                      </LinkA>
                    </Link>
                  </MainListImgBox>
                  <MainListContentBox>
                    <MainListButton
                      type="button"
                      onClick={() => mainListDivClick(title, item.id)}
                    >
                      <MainListContentP>
                        <Link href={`/detail/${title}/${item.id}`}>
                          <LinkA>{item.title}</LinkA>
                        </Link>
                      </MainListContentP>
                      <MainListContentP>
                        <Link href={`/detail/${title}/${item.id}`}>
                          <LinkA>{item.post_content}</LinkA>
                        </Link>
                      </MainListContentP>
                    </MainListButton>
                    <LikeAndComment />
                  </MainListContentBox>
                </MainListDiv>
              </MainList>
            );
          })}
        <div ref={endList} style={{ height: "20px" }}></div>
      </MainUl>
    </>
  );
};

export default Home;

const LogoImg = styled.img`
  width: 40px;
`;

const MainUl = styled.ul`
  width: 100%;
`;

const MainList = styled.li`
  width: 100%;
  background-color: ${darkTheme.contentColor};
  border-radius: 4px;
  margin-bottom: 24px;
  padding: 16px;
  box-sizing: border-box;
  min-width: 430px;

  &:hover {
    box-shadow: 0.5px 0.5px 10px ${darkTheme.accentColor};
  }
`;

const MainListButton = styled(MainListLikeButton)`
  background-color: transparent;
  cursor: pointer;
  padding: 8px;
`;

const MainListP = styled.p`
  display: flex;
  > :nth-child(2) {
    color: #ececec;
    font-size: 18px;
  }
  > time {
    line-height: 19px;
    &::before {
      width: 10px;
      height: 10px;
      padding: 0 2px 0 4px;
      content: "•";
    }
  }
  span + span {
    padding-left: 8px;
  }
`;

const MainListSpan = styled.span`
  color: #bbb;
  font-size: 16px;
`;

const MainListTime = styled.time`
  color: #bbb;
  font-size: 14px;
`;

const MainListDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const MainListImgBox = styled.div`
  display: inline-block;
  padding: 8px;
`;

const MainListContentBox = styled.div`
  display: inline-block;
  width: 70%;

  > :last-child {
    border-top: 1px solid #aaa;
  }
`;

const MainHeadDiv = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 10px 20px;
`;

const LinkA = styled.a`
  text-decoration: none;
  cursor: pointer;
`;
