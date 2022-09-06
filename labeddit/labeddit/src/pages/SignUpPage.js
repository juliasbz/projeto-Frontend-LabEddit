import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import useUnprotectedPage from "../hooks/useUnprotectedPage";
import useForm from '../hooks/useForm';
import { requestSignUp } from '../services/requests';
import { goToLoginPage } from "../routes/coordinator";
import styled from 'styled-components';

const Section = styled.section`

form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
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

function SignUpPage() {
    useUnprotectedPage();
    const navigate = useNavigate();

    const { form, onChange, clear } = useForm({ name: "", email: "", password: "" });

    const signup = (event) => {
        event.preventDefault();
        requestSignUp(form, clear, navigate);
    };

    return (
        <main>
            <Header
                isProtected={false}
            />
            <hr />
            <Section>
                <form onSubmit={signup}>
                    <label htmlFor={"name"}> Nome: </label>
                    <input
                        id={"name"}
                        name={"name"}
                        value={form.name}
                        onChange={onChange}
                        pattern={"^.{3,}$"}
                        title={"O nome deve ter no mínimo 3 caracteres"}
                        required
                    />
                    <label htmlFor={"email"}> E-mail: </label>
                    <input
                        id={"email"}
                        type={"email"}
                        name={"email"}
                        value={form.email}
                        onChange={onChange}
                        required
                    />
                    <label htmlFor={"password"}> Senha: </label>
                    <input
                        id={"password"}
                        type={"password"}
                        name={"password"}
                        value={form.password}
                        onChange={onChange}
                        pattern={"^.{8,30}$"}
                        title={"O nome deve ter no mínimo 8 e no máximo 30 caracteres"}
                        required
                    />
                    <button type={"submit"}>Cadastrar usuário</button>
                    <button onClick={() => goToLoginPage(navigate)}>Voltar</button>
                </form>
            </Section>
        </main>
    );
};

export default SignUpPage;