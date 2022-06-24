import React, { ReactElement } from 'react';
import { gql,useMutation } from '@apollo/client';
interface props {
    open: boolean;
    close: () => void; // 함수 타입 정의할 때
}


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
    const [login, { data, loading, error }] = useMutation(LOGIN,{
     variables:{
        email: "code@gmail.com",
        password: "1234"
     }
    })
    return (
        <div className={open ? 'bg' : ''} >
            <div className={open ? 'modal active' : 'modal'}>
                {open ? (
                    <div className="area">
                        <a className="close" onClick={close}> x </a>
                        <p>로그인 모달 내용</p>
                        <button onClick={login}>로그인</button>
                    </div>
                ) : null}
            </div>
            <style jsx>{`
                .bg {
                    top: 25%;
                    left: 25%;
                    height: 50vh;
                    width: 50vw;
                    align-items: center;
                    background-color: rgba(0, 0, 0, 0.034);
                    display: flex;
                    justify-content: center;
                    overflow: hidden;
                    position: absolute;
                    z-index: 100;
                }
            `}</style>
        </div>
    );
};

export default OrderModal;