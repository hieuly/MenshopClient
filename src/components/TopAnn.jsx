import styled from "styled-components";
import  { Call } from "@material-ui/icons"


const Container = styled.div`
    height: 30px;
    background-color: black;
    color: white;
    display: flex;
    // algin-items: center;
    // justify-content: center;
    font-size: 20px;
    font-weight: 500;
`;

const Hotline = styled.div`
    margin-left: 10px;
    font-size: 17px;
    color: transparent;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
`;


const CallContainer = styled.div`
    margin-left: 100px;    
`;

const Right = styled.div`
    flex: 2;
    text-align: center;
    margin-center: center;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    color: transparent;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
`;

const Right2 = styled.div`
    text-align: right;
    margin-right: 200px;
    font-size: 17px;
    color: transparent;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
`;

function TopAnn() {
  return (
    <Container>
        <CallContainer>
                <Call/>
            </CallContainer>
        <Hotline>      
            Hotline: +84933537612
        </Hotline>
        <Right>
            Cách chọn size
        </Right>
        <Right2>
            Giới thiệu về chúng tôi
        </Right2>
    </Container>
  )
}

export default TopAnn