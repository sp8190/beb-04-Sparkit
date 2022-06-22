import type { NextPage } from "next";
import styled from "styled-components";
import GlobalStyle from "../styles/global-styles";
import NavBar from "../components/NavBar";
import Head from "next/head";
import Image from "next/image";

interface HomeProps {
  backgroundColor: string;
}

const ARR = Array.from({ length: 10 }, (v, i) => i);

const Home: NextPage = () => {
  return (
    <HomeMain>
      <HomeMainDiv>
        <HomeAside>
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
        </HomeAside>
        <HomeSection>
          <HomeMainHeadDiv>
            <h1>전체 태그</h1>
          </HomeMainHeadDiv>
          <HomeMainUl>
            {ARR.map((item, index) => {
              return (
                <HomeMainList key={`${item + index}`}>{item}</HomeMainList>
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
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

const HomeAside = styled.aside`
  width: 20%;
`;

const HomeSection = styled.section`
  width: 90%;
  padding: 20px;
  box-sizing: border-box;
`;

const HomeAsideDiv = styled.div<HomeProps>`
  background-color: ${(props) => props.backgroundColor};
  height: 300px;
  border-radius: 2px;
  margin: 20px 0;
  padding: 12px;
`;

const HomeMainUl = styled.ul`
  overflow-y: scroll;
  height: calc(100vh - 52px - 40px - 120px - 20px);

  &::-webkit-scrollbar {
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
  }
`;

const HomeMainList = styled.li`
  width: 96%;
  background-color: #595959;
  height: 130px;
  border-radius: 2px;
  margin: 12px;
`;

const HomeMainHeadDiv = styled.div`
  height: 60px;
  padding: 20px;
`;
