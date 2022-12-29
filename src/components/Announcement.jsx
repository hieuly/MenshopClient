import styled from "styled-components"
import Marqueque from "react-fast-marquee";
import {NewReleases} from "@material-ui/icons"

const Container = styled.div`
    height: 30px;
    background-color: #E4A1D6;
    color: black;
    display: flex;
    algin-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 500;
`;

const Icon = styled.div`
    color: red;
`;

function Announcement() {
    return (
        <Container>
            <Marqueque speed={150} > Deal Sốc
                <Icon>
                    <NewReleases/>
                    <NewReleases/>
                    <NewReleases/>
                </Icon> Giảm giá đến tận 30% tất cả mặt hàng</Marqueque>  
        </Container>      
    )
}

export default Announcement
