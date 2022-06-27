import { gql, useMutation, useQuery } from "@apollo/client";
import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

//회원가입시 gql로
//email, nickname, password, account , created_at , balance
const SIGN_UP = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $nickname: String!
    $account: String!
    $balance: String!
    $private_key: String!
  ) {
    createUser(
      email: $email
      password: $password
      nickname: $nickname
      account: $account
      balance: $balance
      private_key: $private_key
    )
  }
`;
interface IFormValue {
  nickname?: string;
  email?: string;
  password?: string;
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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormValue>({
    defaultValues: {
      email: "",
      password: "",
      nickname: "",
    },
  });

  const [createUser, { data: user, loading, error }] = useMutation(SIGN_UP, {});
  const onSubmitHandler: SubmitHandler<IFormValue> = (data) => {
    console.log("1234");
    console.log(data);

    const { email, password, nickname } = data;
    console.log(nickname, email, password);
    createUser({
      variables: {
        user: {
          email: email,
          password: password,
          nickname: nickname,
          account: "string1234",
          balance: "string1234",
          private_key: "string1234",
        },
      },
    }).catch((error) => {
      console.dir(error);
    });
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
              value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "It's not a valid email input",
            },
          })}
          placeholder="Email"
          type="email"
          autoComplete="on"
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
          type="password"
          autoComplete="on"
        />
        {/* <FormLabel>Password_confirm</FormLabel>
        <FormInput
          {...register("password_confirm", {
            required: true,
            validate: (value) => value === passwordRef.current,
          })}
          type="password"
        /> */}
        <FormLabel>Nickname</FormLabel>
        <FormInput
          {...register("nickname", { required: true, maxLength: 20 })}
        />
        {errors.nickname && errors.nickname.type === "required" && (
          <div>닉네임을 입력해 주세요!</div>
        )}
        {errors.nickname && errors.nickname.type === "maxLength" && (
          <div>닉네임은 최대 20자만 입력할 수 있습니다!</div>
        )}
        <Submit onSubmit={handleSubmit(onSubmitHandler)}>가입하기</Submit>
      </FormSubmit>
    </Container>
  );
};
export default SignUp;
