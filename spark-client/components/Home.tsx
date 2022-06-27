import styled from "styled-components";
import { ARR } from "../config/mainMock";
import { useEffect, useState } from "react";

import { darkTheme } from "../styles/theme";

type Props = {
  children: React.ReactNode;
};

interface BackColor {
  backgroundColor: string;
}
interface Obj {
  name: string;
  count: number;
}

interface TagsCount {
  [name: string]: number;
}

interface Obj {
  name: string;
  count: number;
}

const tags = ARR.map((item) => item.tag);

const Home = (props: Props) => {
  const [obj, setObj] = useState<Obj[]>([]);
  const sortTagCountArr = (arr: Obj[]) => {
    return arr.sort(function (a, b) {
      return b.count - a.count;
    });
  };

  const tagsCountObj = (arr: string[]) => {
    const newObj: TagsCount = {};
    arr.forEach((item) => {
      if (newObj[item]) newObj[item] += 1;
      else newObj[item] = 1;
    });
    return newObj;
  };

  const tagsCountArr = (obj: TagsCount) => {
    const arr = [];
    for (let key in obj) {
      arr.push({ name: key, count: obj[key] });
    }
    return arr;
  };

  useEffect(() => {
    const sortedArr = sortTagCountArr(tagsCountArr(tagsCountObj(tags)));
    setObj(sortedArr);
  }, []);
  return (
    <Main>
      <MainDiv>
        <Aside>
          <AsideContainer>
            <AsideDiv backgroundColor="tomato">
              <ul>
                <AsideLi>공지사항</AsideLi>
                <AsideLi>
                  <p>hi</p>
                </AsideLi>
                <AsideLi>
                  <p>hi2</p>
                </AsideLi>
              </ul>
            </AsideDiv>
            <AsideDiv backgroundColor="skyblue">
              <nav>
                <ul>
                  <AsideLi>전체 태그</AsideLi>
                  {obj.map((item, index) => {
                    return (
                      <AsideLi key={item.name + index}>{item.name}</AsideLi>
                    );
                  })}
                </ul>
              </nav>
            </AsideDiv>
          </AsideContainer>
        </Aside>
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

const Aside = styled.aside`
  position: relative;
  width: 20vw;
  min-width: 250px;
  max-width: 280px;
`;

const AsideLi = styled.li`
  padding: 12px 16px;
`;

const AsideContainer = styled.div`
  position: fixed;
  width: inherit;
  min-width: 250px;
  max-width: 280px;
`;

const AsideDiv = styled.div<BackColor>`
  background-color: ${(props) => props.backgroundColor};
  height: 300px;
  border-radius: 4px;
  margin: 20px 0;
  padding: 12px;
`;

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1400px;
  margin: 40px auto 0;
`;
