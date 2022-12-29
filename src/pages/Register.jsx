import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { register } from "../redux/apiCalls";
import { useDispatch,useSelector } from "react-redux";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255,255,255,0.5),
        rgba(255,255,255,0.5)
    ), 
    url("https://64.media.tumblr.com/d5e15e891de8a4643e07a3773a2841ac/353b79e37722c7ea-1f/s1280x1920/83a80468b76296b1914701dc2a60f16fb28069f8.pnj") center;

    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
    font-size: 24px;
    font-weightL 300;
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`;

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin: auto;
    display: block;
`;
const Error = styled.span`
color:red;
`


const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error} = useSelector((state)=>state.user);

    const handleClick = (e) => {
        e.preventDefault();
        register(dispatch, { username, email , password });
    };
  return (
    <Container>
        <Wrapper>
            <Title>TẠO TÀI KHOẢN</Title>
            <Form>
                <Input placeholder="Tên Tài Khoản" onChange={(e) => setUsername(e.target.value)}/>
                <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                <Input placeholder="Mật Khẩu" type="password" onChange={(e) => setPassword(e.target.value)}/>
                <Input placeholder="Xác Nhận Mật Khẩu" type="password"/>
                <Agreement>Khi tạo tài khoản, tôi đồng ý với việc xử lý dữ liệu cá nhân của mình theo 
                <b> CHÍNH SÁCH BẢO MẬT</b>
                </Agreement>
                <Button onClick={handleClick} disabled={isFetching}>Xác Nhận</Button>
                {error && <Error>Something went wrong...</Error>}
            </Form>
        </Wrapper>
    </Container>
  );
};

export default Register