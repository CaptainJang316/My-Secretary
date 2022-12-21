import styled from "styled-components";
import { Link } from 'react-router-dom';

interface MenuBarProps {
    currentMenuItem: string;
}

interface MenuItemProps {
    text: string;
    currentMenuItem: string;
}

const MenuItem = styled.div<MenuItemProps>`
    display: inline-block;
`;

const MenuLink = styled(Link)`
    text-decoration: none;
    color: gray;
    outline: none;
    &:hover{  
            background-color : black;
            border-radius: 15px;
            color : white;
        }
    display: inline-block;
    padding: 15px 20px 15px 20px;
`;

const Container = styled.div<MenuBarProps>`
    width: 100%;
    height: 77px;
    currentMenuItem: ${(props) => props.currentMenuItem};
    // text-align: center;
    border-bottom: 1px solid gray;
    // background-color: black;
    color: white;
`;

const ProfileWrapper = styled.div`
vertical-align:middle;
display:table-cell;
`;

const ProfileImg = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border: 2px solid rgb(163, 151, 198);
    border-radius: 50%;
    display: inline-block;
    margin: 15px;
    margin-left: 25px;
    vertical-align:middle;
`;

const Title = styled.div`
    padding: 7px 180px 15px 10px;
    display: inline-block;
    vertical-align:middle;
    font-size: 1.5rem;
    font-weight: bold; 
`;

function MenuBar({ currentMenuItem }: MenuBarProps) {
    return (
      <Container currentMenuItem={currentMenuItem ?? ""}>
        <ProfileImg src="img/profile_img.jpg" />
        <Title>
            I'm Gyeongsu Jang
        </Title>
        <MenuLink to="/toDoList">ToDoList</MenuLink>
        <MenuLink to="/diary">Diary</MenuLink>
        <MenuLink to="/stockPrices">경수 주가</MenuLink>
        <MenuLink to="/protein">단백질 섭취량</MenuLink>
        <MenuLink to="/bookEssay">독후 에세이</MenuLink>
      </Container>
    );
}

export default MenuBar;