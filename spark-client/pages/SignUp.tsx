import { gql, useMutation, useQuery } from "@apollo/client";
import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
interface FormValue {
  name?: string;
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
  font-size: 3rem;
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
const SingUpschema = yup
  .object({
    id: yup
      .string()
      .required("필수 입력값입니다")
      .test("id", "4자 이상 12자 이하입니다", (val: any) =>
        /^[a-z]+[a-z0-9]{3,11}$/g.test(val)
      ),
    password: yup
      .string()
      .required("필수 입력값입니다")
      .test("pw", "숫자 + 영문자 8자 이상 16자 이하입니다", (val: any) =>
        /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/.test(val)
      ),
    passwordConfirm: yup
      .string()
      .required("필수 입력값입니다")
      .oneOf([yup.ref("password")], "패스워드가 일치하지 않습니다"),
    name: yup.string().required("필수 입력값입니다"),
  })
  .required();

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>({ resolver: yupResolver(SingUpschema) });
  const [user, setUser] = useState(0);
  // 비밀번호와 비밀번호 확인이 일치하는지 검증하기 위해 "password" input 의 value 를 추적함
  const passwordRef = useRef<string | null>(null);

  const [createUser, { data, loading, error }] = useMutation(SIGN_UP, {
    variables: {
      email: "test123@gmail.com",
      password: "1234",
      nickname: "123",
      account: "238423904",
      balance: "2348290",
      private_key: "92038490234",
    },
  });

  const onSubmitHandler: SubmitHandler<FormValue> = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <Title>Sign Up</Title>
      <FormSubmit onSubmit={handleSubmit(onSubmitHandler)}>
        <FormLabel>Nickname</FormLabel>
        <FormInput
          {...register("nickname", { required: true, maxLength: 20 })}
        />
        {errors.name && errors.name.type === "required" && (
          <div>닉네임을 입력해 주세요!</div>
        )}
        {errors.name && errors.name.type === "maxLength" && (
          <div>닉네임은 최대 20자만 입력할 수 있습니다!</div>
        )}
        <FormLabel>Email</FormLabel>
        <FormInput
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          type="email"
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          {...register("password", { required: true, minLength: 6 })}
          type="password"
        />
        <FormLabel>Password_confirm</FormLabel>
        <FormInput
          {...register("password_confirm", {
            required: true,
            validate: (value) => value === passwordRef.current,
          })}
          type="password"
        />
        <Submit onClick={createUser}>가입하기</Submit>
      </FormSubmit>
    </Container>
  );
};
export default SignUp;
