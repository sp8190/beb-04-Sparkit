import styled from "styled-components";

import { darkTheme } from "../styles/theme";

import Aside from "./Aside";

type Props = {
  children: React.ReactNode;
};

const Home = (props: Props) => {
  return (
    <Main>
      <MainDiv>
        <Aside setTitle={undefined} />
        <Section>{props.children}</Section>
      </MainDiv>
    </Main>
  );
};

export default Home;

const Section = styled.section`
  width: 60vw;
  padding: 20px;
  margin-left: 12px;
  box-sizing: border-box;
  min-height: calc(100vh - 80px);
`;

const Main = styled.main`
  margin: 0 auto;
  background-color: ${darkTheme.bgColor};
  color: #fafafa;
  min-height: calc(100vh - 52px);
  padding: 20px;
  box-sizing: border-box;
`;

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1400px;
  margin: 40px auto 0;
`;
