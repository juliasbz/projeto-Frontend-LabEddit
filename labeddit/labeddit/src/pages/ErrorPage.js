import { useNavigate } from 'react-router-dom';
import { goToFeedPage } from '../routes/coordinator';
import styled from 'styled-components';

const Main = styled.main`
button{
    background-color:#e78100;
	border-radius:10px;
    border: solid white;
	color:white;
	font-family:Arial;
	font-size:12px;
	font-weight:bold;
	padding:5px 10px;
    margin: 2px;
}

span{
    font-family:Arial;
	font-size:12px;
	font-weight:bold;
    margin-top: 8px;
    margin-left: 10px;
    margin-right: 10px;
}
`

function ErrorPage() {
    const navigate = useNavigate();

    return(
        <Main>
            <h1>Error 400 - Página não encontrada!</h1>
            <button onClick={() => goToFeedPage(navigate)}>Ir para Feed</button>
        </Main>
    );
};

export default ErrorPage;