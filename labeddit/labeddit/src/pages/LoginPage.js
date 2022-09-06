import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import useUnprotectedPage from '../hooks/useUnprotectedPage';
import useForm from '../hooks/useForm';
import { requestLogin } from "../services/requests";
import { goToSignUpPage } from "../routes/coordinator";
import styled from 'styled-components';

const Section = styled.section`
form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

h3{
    margin-top: 10px;
}

button{
    background-color:#e78100;
    border: solid white;
	border-radius:6px;
	color:white;
	font-family:Arial;
	font-size:13px;
	font-weight:bold;
	padding:5px 10px;
    margin: 2px;
    margin-top: 5px;
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

function LoginPage() {
    useUnprotectedPage();
    const navigate = useNavigate();

    const { form, onChange, clear } = useForm({ email: "", password: "" });

    const login = (event) => {
        event.preventDefault();
        requestLogin(form, clear, navigate);
    };

    return (
        <main>
            <Header
                isProtected={false}
            />
            <hr />
            <Section>
                <form onSubmit={login}>
                    <label htmlFor={"email"}>Email: </label>
                    <input
                        id={"email"}
                        type={"email"}
                        name={"email"}
                        value={form.email}
                        onChange={onChange}
                    ></input>
                    <label htmlFor={"password"}> Senha: </label>
                    <input
                        id={"password"}
                        type={"password"}
                        name={"password"}
                        value={form.password}
                        onChange={onChange}
                    ></input>
                    <button type={"submit"}>Entrar</button>
                    <h3>Não tem cadastro?</h3>
                    <button onClick={() => goToSignUpPage(navigate)}>Cadastrar</button>
                </form>
            </Section>
        </main>
    );
};

export default LoginPage;