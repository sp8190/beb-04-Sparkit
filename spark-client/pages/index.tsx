import type { NextPage } from "next";
import styled from "styled-components";

import { gql, useQuery } from "@apollo/client";
import { ARR } from "../config/mainMock";
import { useEffect, useState } from "react";

interface HomeProps {
  backgroundColor: string;
}

interface Posts {
  id: number;
  title: string;
  postContent: string;
  userId: number;
  createdAt: string;
}

interface Result {
  data: Posts;
  loading: boolean;
}

const ALL_POST = gql`
  query GetPosts {
    getPosts {
      id
      title
    }
  }
`;

const Home: NextPage = ({}) => {
  const { data, loading } = useQuery<Result>(ALL_POST);
  const [arr, setArr] = useState([]);
  console.log(data);

  useEffect(() => {}, []);

  // {
  //   ARR.map((item, index) => {
  //     return item.tag;
  //   }).forEach((item)=>{
  //     const result: Tags = {}
  //     if(result[item])
  //   });
  // }
  return (
    <HomeMain>
      <HomeMainDiv>
        <HomeAside>
          <HomeAsideContainer>
            <HomeAsideDiv backgroundColor="tomato">
              <h4>공지사항</h4>
              <ul>
                <li>hi</li>
                <li>hi2</li>
              </ul>
            </HomeAsideDiv>
            <HomeAsideDiv backgroundColor="skyblue">
              <nav>
                <ul>
                  <li>전체 태그</li>
                </ul>
              </nav>
            </HomeAsideDiv>
          </HomeAsideContainer>
        </HomeAside>
        <HomeSection>
          <HomeMainHeadDiv>
            <h1>전체 태그</h1>
          </HomeMainHeadDiv>
          <HomeMainUl>
            {ARR.map((item, index) => {
              return (
                <HomeMainList key={`${item.id + index}`}>
                  <p>
                    <span>{item.userId}</span>
                    <span>해시태그</span>
                    <span>{item.createdAt}</span>
                  </p>
                  <HomeMainListDiv>
                    <HomeMainListImgBox>img</HomeMainListImgBox>
                    <HomeMainListContentBox>
                      <p>{item.title}</p>
                      <p>{item.postContent}</p>
                      <p>
                        <span>좋아요</span>
                        <span>댓글</span>
                      </p>
                    </HomeMainListContentBox>
                  </HomeMainListDiv>
                </HomeMainList>
              );
            })}
          </HomeMainUl>
        </HomeSection>
      </HomeMainDiv>
    </HomeMain>
  );
};

export default Home;

const HomeMain = styled.main`
  margin: 0 auto;
  background-color: #393939;
  color: #fafafa;
  min-height: calc(100vh - 52px);
  padding: 20px;
  box-sizing: border-box;
`;

const HomeMainDiv = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1400px;
  margin: 40px auto 0;
`;

const HomeAside = styled.aside`
  position: relative;
  width: 20vw;
  min-width: 250px;
  max-width: 280px;
`;

const HomeSection = styled.section`
  width: 60vw;
  padding: 20px;
  box-sizing: border-box;
`;

const HomeAsideContainer = styled.div`
  position: fixed;
  width: inherit;
  min-width: 250px;
  max-width: 280px;
`;

const HomeAsideDiv = styled.div<HomeProps>`
  background-color: ${(props) => props.backgroundColor};
  height: 300px;
  border-radius: 2px;
  margin: 20px 0;
  padding: 12px;
`;

const HomeMainUl = styled.ul`
  /* &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 10px;
    height: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  } */
  margin-left: 20px;
  width: 100%;
`;

const HomeMainList = styled.li`
  width: 100%;
  background-color: #595959;
  height: 120px;
  border-radius: 2px;
  margin: 12px 0;
  padding: 16px;
  box-sizing: border-box;
`;

const HomeMainListDiv = styled.div`
  display: flex;
  margin-top: 12px;
`;

const HomeMainListImgBox = styled.div`
  display: inline-block;
  width: 100px;
  height: 50px;
`;

const HomeMainListContentBox = styled.div`
  display: inline-block;
  width: 70%;
`;

const HomeMainHeadDiv = styled.div`
  height: 60px;
  padding: 10px 20px;
`;
