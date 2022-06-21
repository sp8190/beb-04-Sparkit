import Link from "next/link";
import { ReactElement, useState, useEffect } from 'react';
import { useRouter } from "next/router";
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';

const NavBar = (): ReactElement => {
    const [showSignIn, setshowSignIn] = useState<boolean>(false);
    const [showSignUp, setshowSignUp] = useState<boolean>(false);

    function openSignin() {
        setshowSignIn(!showSignIn);
    }

    function closeSignin() {
        setshowSignIn(!showSignIn);
    }

    function openSignUp() {
        setshowSignUp(!showSignUp);
    }

    function closeSignUp() {
        setshowSignUp(!showSignUp);
    }

    const router = useRouter();
    return (
        <nav>
            <div>
                <button className="request_btn" onClick={openSignin}>
                    로그인
                </button>
                <SignInModal open={showSignIn} close={closeSignin} />
                <button className="request_btn" onClick={openSignUp}>
                    회원가입
                </button>
                <SignUpModal open={showSignUp} close={closeSignUp} />
            </div>
            <style jsx>{`
        nav {
          display: flex;
          gap: 10px;
          flex-direction: column;
          align-items: flex-end;
          padding-top: 20px;
          padding-bottom: 10px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
            rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        }
        nav div {
          display: flex;
          gap: 10px;
        }
      `}</style>
        </nav>
    );
}

export default NavBar;