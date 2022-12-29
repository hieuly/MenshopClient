import React from 'react'
import styled from "styled-components"
import {Badge} from "@material-ui/core";
import {Search, ShoppingCartOutlined} from "@material-ui/icons"
import {mobile} from "../responsive";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from "../redux/userRedux";

const Container = styled.div`
    height: 100px;
    background-color: #CCFF66;
    ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px; 
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Languege = styled.span`
    font-size: 14px;
    cursor: pointer;
    font-weight: bold;
    ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    background-color: darkblue;
    width: 200px;
    height: 25px;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 10px;
    
`;

const Input = styled.input`
  border: 0.5px solid lightgray;
  border: radius;
  width: 200px;
  height: 30px;
  align-text: left;
  box-sizing: border-box;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-item: center;
  justify-content: flex-end;
  ${mobile({ flex:2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft:"10px" })}
`;

const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('persist:root');
	};

  
  return (
    <Container>
      <Wrapper>
        <Left>
        <SearchContainer placeholder="Searching...">
            <Input placeholder="Searching..."/>          
          </SearchContainer>
          <Search style={{color:"purple", fontSize:25}}/>
        </Left>
        
        <Center>
        <Logo>M.E.N</Logo>
        </Center>

        <Right>
        <MenuItem><Languege>VN</Languege></MenuItem>
        {user ?
        <>
          <MenuItem>
          <Link to={`/user/${user.id}`}>
          <span>{user.username}</span>
          </Link>
          </MenuItem>
          <button onClick={handleLogout}>Thoát</button>
          </>
            :
            <>
          <Link to="/register"> 
            <MenuItem><button>Đăng Ký</button></MenuItem>
          </Link>

          <Link to="/login">
            <MenuItem><button>Đăng Nhập</button></MenuItem>
          </Link>
          </>
        }
          <Link to="/cart">
          <MenuItem>
            <Badge badgeContent= {quantity} color="primary">
              <ShoppingCartOutlined/>
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar
