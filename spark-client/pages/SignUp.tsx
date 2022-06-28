import { gql, useMutation, useQuery } from "@apollo/client";
import { typeFromAST } from "graphql";
import { useRouter } from "next/router";
import { em } from "polished";
import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { createAccountMutation } from "../mutations/__generated__/createAccountMutation";
import axios from "axios";

//회원가입시 gql로
//email, nickname, password, account , created_at , balance
const SIGN_UP = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $nickname: String!
    $account: String!
    $private_key: String!
  ) {
    createUser(
      email: $email
      password: $password
      nickname: $nickname
      account: $account
      private_key: $private_key
    )
  }
`;
interface IFormValue {
  nickname?: string;
  email?: string;
  password?: string;
  password_confirm?: string;
}

const Container = styled.div`
  font-family: sans-serif;
  display: grid;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right, #0f2027, #203a43, #2c5364);
  justify-content: center;
`;
const FormSubmit = styled.form`
  flex-direction: column;
  align-items: center;
  display: flex;
  width: 100vw;
  height: 100vh;
  max-height: 480px;
`;
const FormLabel = styled.label`
  font-size: 25px;
  color: #e6e6e6;
`;
const FormInput = styled.input`
  padding: 20px;
  max-width: 480px;
  border-radius: 25px;
  font-size: 25px;
  width: 50vw;
  height: 25vh;
  margin: 20px;
  border: none;
  :hover {
    box-shadow: #b7dae9 0 0 20px;
    transition: 0.2s ease;
  }
`;
const Title = styled.div`
  align-items: center;
  color: #55e696;
  font-weight: 600;
  display: flex;
  font-size: 4rem;
  justify-content: center;
  padding-top: 50px;

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
`;

const Submit = styled.button`
  height: 200px;
  font-size: 25px;
  font-weight: 600;
  border-radius: 25px;
  padding: 10px 25px;
  background-color: #19ca69;
  color: white;
  border: none;
  :hover {
    box-shadow: #b7dae9 0 0 20px;
    transition: 0.2s ease;
  }
`;

const SignUp: React.FC = () => {
  const router = useRouter();
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<IFormValue>({
    mode: "onChange",
  });
  const onComplete = (data: createAccountMutation) => {
    const {
      createAccount: { error, ok },
    } = data;
    if (ok) {
      router.push("/");
      alert("Account created! Log in now");
    }
    if (error) {
      console.error(error);
    }
  };

  //mutation 하면서 발생할 이벤트들

  //유저데이터값 받기
  //데이터값은 useState객체로 받은 후 에 유저의 정보를 state 에 넣을것
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  //데이터값 검증
  //데이터값 검증은 useState 검증하면서 동시에 이러줘야함 useFrom 훅을 이용해 자동으로검증
  //+이메일 검증 과정 넣을것

  //mutation으로 서버에 post요청
  //gql 쿼리 변수 지정후 useMutation에 넣은후 에 variables에 객체 만들어서 넣기
  //넣은후 onClick 이벤트를 통해 서버로 post 요청하기 이때 axios 사용해서 보내기

  //성공 후 onComplete 함수실행 메인페이지로 이동시키기
  //useMutation의 함수가 실행될 이벤트헨들러 생성후 안에 onComplete Mutation 생성하여
  //성공한 결과를 서버로 보내기
  //그후 router.push로 메인페이지로 보낼것

  const [createUser, { data, loading, error }] = useMutation(SIGN_UP);
  const onSubmit = (e: any) => {
    console.log(e.target);
    e.preventDefault();

    if (!loading) {
      console.log(e);
      createUser({
        variables: {
          email: email,
          password: password,
          nickname: nickname,
          account: "",
          private_key: "",
        },
      });
    }
  };
  return (
    <Container>
      <Title>Sign Up</Title>
      <FormSubmit>
        <FormLabel>Email</FormLabel>
        <FormInput
          {...register("email", {
            required: "Email required",
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "It's not a valid email input",
            },
          })}
          placeholder="Email"
          autoComplete="on"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {errors.email?.message && <div errorMessage={errors.email.message} />}
        <FormLabel>Password</FormLabel>
        <FormInput
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 4,
              message: "password must be more than 10 characters",
            },
          })}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <FormLabel>Password_confirm</FormLabel>
        <FormInput
          {...register("password_confirm", {
            required: true,
            validate: (value) => value === password,
          })}
          type="password"
        />
        <FormLabel>Nickname</FormLabel>
        <FormInput
          {...register("nickname", { required: true, maxLength: 20 })}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
        {errors.nickname && errors.nickname.type === "required" && (
          <div>닉네임을 입력해 주세요!</div>
        )}
        {errors.nickname && errors.nickname.type === "maxLength" && (
          <div>닉네임은 최대 20자만 입력할 수 있습니다!</div>
        )}

        <Submit onClick={(e) => onSubmit(e)} type="submit">
          가입하기
        </Submit>
      </FormSubmit>
    </Container>
  );
};
export default SignUp;
