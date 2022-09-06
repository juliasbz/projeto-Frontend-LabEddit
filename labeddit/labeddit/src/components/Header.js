import { useNavigate } from "react-router-dom";
import { goToLoginPage } from "../routes/coordinator";
import styled from 'styled-components';
import logo from '../img/logo.png';

const HeaderEddit = styled.section`
display: flex;
align-items: center;
justify-content: space-between;
height: 100px;
padding: 20px;

img{
    height: 220px;
    margin-top: 25px;
}

button{
    background-color:#e78100;
    border: solid white;
	border-radius:10px;
	color:white;
	font-family:Arial;
	font-size:16px;
	font-weight:bold;
	padding:5px 10px;
    margin: 2px;
}

span{
    font-family:Arial;
	font-size:15px;
	font-weight:bold;
    margin-top: 8px;
    margin-left: 10px;
    margin-right: 10px;
}
`

function Header(props) {
    const navigate = useNavigate();
    const logout = () => {
        if (window.confirm("Tem certeza de que deseja sair?")) {
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
            goToLoginPage(navigate);
            alert("Logout com sucesso!");
        };
    };

    return (
        <HeaderEddit>
            <h1><img src={logo} /></h1>
            {props.isProtected && (
                <>
                    <h3>Bem-vindo, {localStorage.getItem("userEmail")}!</h3>
                    <button onClick={logout}>Logout</button>
                </>
            )}
           
        </HeaderEddit>
    );
};

export default Header;