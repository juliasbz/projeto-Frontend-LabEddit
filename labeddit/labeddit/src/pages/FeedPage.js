import { useContext, useEffect } from "react";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import GlobalStateContext from "../global/GlobalStateContext";
import useProtectedPage from "../hooks/useProtectedPage";
import useForm from "../hooks/useForm";
import { requestCreatePost } from '../services/requests';
import styled from 'styled-components';

const Section = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1%;

    button{
    background-color:#e78100;
    border: solid white;
	border-radius:10px;
	color:white;
	font-family:Arial;
	font-size:13px;
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
const OrdenaPagina = styled.section`
display: flex;
flex-direction: row;
justify-content: center;

button{
    background-color:#e78100;
    border: solid white;
	border-radius:10px;
	color:white;
	font-family:Arial;
	font-size:13px;
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

function FeedPage() {
    useProtectedPage();

    const { form, onChange, clear } = useForm({ title: "", body: "" });
    const { states, setters, getters } = useContext(GlobalStateContext);
    const { posts, page, isLoading } = states;
    const { setPage } = setters;
    const { getPosts } = getters;

    useEffect(() => {
        getPosts(page);
    }, []);

    const createPost = (event) => {
        event.preventDefault();
        requestCreatePost(form, clear, getPosts);
    };

    const changePage = (sum) => {
        const nextPage = page + sum;
        setPage(nextPage);
        getPosts(nextPage);
    };

    const showPosts = posts.length && posts.map((post) => {
        return (
            <PostCard
                key={post.id}
                post={post}
                isFeed={true}
            />
        )
    })

    return (
        <main>
            <Header
                isProtected={true}
            />
            <hr />
            <Section>
                <form onSubmit={createPost}>
                    <label htmlFor={"title"}> Título: </label>
                    <input
                        id={"title"}
                        name={"title"}
                        value={form.title}
                        onChange={onChange}
                        pattern={"^.{5,}$"}
                        title={"O nome deve ter no mínimo 5 caracteres"}
                        required
                    />
                    
                    <label htmlFor={"body"}> Descrição: </label>
                    <input
                        id={"body"}
                        type={"text"}
                        name={"body"}
                        value={form.body}
                        onChange={onChange}
                        pattern={"^.{5,}$"}
                        title={"O nome deve ter no mínimo 5 caracteres"}
                        required
                    />
            
                    <button type={"submit"}>Criar Post</button>
                </form>
            </Section>
            <section>
                <OrdenaPagina>
                    {page !== 1 &&
                        <button onClick={() => changePage(-1)}>Voltar página</button>
                    }
                    <span> Página {page} </span>
                    {posts.length &&
                        <button onClick={() => changePage(1)}>Próxima página</button>
                    }
                </OrdenaPagina>
                {isLoading ? <p>CARREGANDO...</p> : showPosts}
            </section>
        </main>
    );
};

export default FeedPage;