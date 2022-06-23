import { ReactElement, useState, useEffect } from "react";
import { useRouter } from "next/router";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import styled from "styled-components";
import SignUp from "./../pages/SignUp";

const NavContainer = styled.nav`
  position: fixed;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  background-color: #000000ef;
  align-items: center;
  gap: 10px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;
const NavLogo = styled.div`
  border: none;
  color: #55e696;
  font-size: 1.5em;
  font-weight: 500;
  transition: 0.2s;

  :hover {
    font-weight: 600;
    opacity: 1;
  }
`;
const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  border: none;
  color: #ffffff;
  font-size: 1.2em;
  font-weight: 500;
`;
const SignInBtn = styled.a`
  padding: 10px;
  transition: 0.2s;
  :hover {
    font-weight: 600;
    opacity: 1;
  }
`;
const SignUpBtn = styled.a`
  padding: 10px;
  transition: 0.2s;
  :hover {
    font-weight: 600;
    opacity: 1;
  }
`;
const SignPost = styled.a`
  padding: 10px;
  transition: 0.2s;
  :hover {
    font-weight: 600;
    opacity: 1;
  }
`;

const NavBar = (): ReactElement => {
  const [showSignIn, setshowSignIn] = useState<boolean>(false);
  const [showSignUp, setshowSignUp] = useState<boolean>(false);

  function openSignin() {
    setshowSignIn(!showSignIn);
  }

  function closeSignin() {
    setshowSignIn(!showSignIn);
  }

  const router = useRouter();
  return (
    <NavContainer>
      <NavLogo onClick={() => router.push("/")}>Spark it</NavLogo>

      <BtnContainer>
        <SignInBtn onClick={openSignin}>로그인</SignInBtn>
        <SignInModal open={showSignIn} close={closeSignin} />
        <SignUpBtn onClick={() => router.push("/SignUp")}>회원가입</SignUpBtn>
        <SignPost onClick={() => router.push("./WritePost")}>글쓰기</SignPost>
      </BtnContainer>
    </NavContainer>
  );
};

export default NavBar;
