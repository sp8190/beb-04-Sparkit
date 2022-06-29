import React, { ReactElement, useState } from 'react';
import { gql,useMutation } from '@apollo/client';
import styled from 'styled-components';

//모달창 열고 닫기 props
interface props {
    open: boolean;
    close: () => void; 
}

//graphql 쿼리문
const LOGIN =gql`
mutation Mutation(
    $email: String!,
     $password: String!) {
    login(email: $email, password: $password) {
      access_token
      refresh_token
    }
  }`
  

const OrderModal = (props: props): ReactElement => {
    const { open, close } = props;
    const [login_id, setLogin_id] = useState("");
    const [login_pw, setLogin_pw] = useState("");
    const [login, { data, loading, error }] = useMutation(LOGIN);

    const handleClick = () => {
        console.log("ID: ",login_id)
        console.log("PW: ",login_pw)

        let cont = login({ variables:{
            email: login_id,
            password: login_pw
         } });

        //access_token의 유무로 로그인 조건문 작성
        cont.then((appdata) =>{
            if(appdata.data.login.access_token === null){
                alert("아이디 혹은 비밀번호가 맞지 않습니다")
            }else{
                alert("로그인완료!")
                setLogin_id("")
                setLogin_pw("")
                close();
            }
        })
    };

    
    return (
        <Container>
            <ModalWrapper className={open ? 'bg' : ''} >
                <div className={open ? 'modal active' : 'modal'}>
                    {open ? (
                        <Area className="area">
                            <div className='logo'>
                                <p className="close" onClick={close}> x </p>
                                <p className="sparkit" > Sparkit </p>
                            </div>    

                            <div>
                                <label className='id_text'>ID</label>
                                <input className='id_input' type="text" 
                                onChange={({ target: { value } }) => setLogin_id(value)}
                                required></input>
                            </div>

                            <div>
                                <label className='pw_text'>PASSWORD</label>
                                <input className='pw_input' type="text" 
                                onChange={({ target: { value } }) => setLogin_pw(value)}
                                required></input>
                            </div>

                            <LoginButton onClick={handleClick}>로그인</LoginButton>
                        </Area>
                    ) : null}
                </div>
            </ModalWrapper>
        </Container>
    );
};

export default OrderModal;

const Container = styled.div`
    font-family: sans-serif;
    .bg {
        top: 200%;
        left: 25%;
        height: 50vh;
        width: 50vw;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.65);
        display: flex;
        justify-content: center;
        overflow: hidden;
        position: absolute;
        z-index: 100;
    }
`;

const ModalWrapper = styled.div`
    .active {
        width: 40vw;
        line-height: 5vh;
    }
`;

const Area = styled.div`
    margin-bottom: 80px;

    .logo{
        margin-bottom: 50px;
    }

    .sparkit{
        font-size: 35px;
        animation: boxFades 3s 1s infinite linear alternate;
        @keyframes boxFades {
            0% {
              color: white;
            }
            25% {
              color: white;
            }
            50% {
              color: #7ae4aa;
            }
            75% {
              color: #55e696;
            }
            100% {
              color: #55e696;
            }
          }
    }

    .close{
        display: flex;
        float: right;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 35px;
        
    }

    .id_input{
        margin-top: 7px;
        height: 3vh;
        width: 22vw;
        float: right;
        align-items: center;
        justify-content: center;
        border: 0;
        outline: 0;
        :hover {
            box-shadow: #b7dae9 0 0 20px;
            transition: 0.2s ease;
          }
    }

    .pw_input{
        margin-top: 7px;
        height: 3vh;
        width: 22vw;
        float: right;
        align-items: center;
        justify-content: center;
        border: 0;
        outline: 0;
        :hover {
            box-shadow: #b7dae9 0 0 20px;
            transition: 0.2s ease;
          }
    }
`;

const LoginButton = styled.button`
    float: right;
    margin-top: 30px;
    
`;
