import { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import CommentCard from '../components/CommentCard';
import GlobalStateContext from "../global/GlobalStateContext";
import useProtectedPage from '../hooks/useProtectedPage';
import useForm from '../hooks/useForm';
import { requestCreateComment } from '../services/requests';
import { goToFeedPage } from '../routes/coordinator';
import styled from 'styled-components';

const Main = styled.main`
form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
section{
    margin-left: 10px;
    margin-top: 10px;
}

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

function PostDetailsPage() {
    useProtectedPage();

    const navigate = useNavigate();

    const params = useParams();

    const { form, onChange, clear } = useForm({ body: "" });
    const { states, getters } = useContext(GlobalStateContext);
    const { post, postComments, isLoading } = states;
    const { getPostComments } = getters;
    useEffect(() => {
        if (post.id && post.id === params.postId) {
            getPostComments(post.id);
        } else {
            alert("Um erro ocorreu! Você será redirecionado para Feed.")
            goToFeedPage(navigate);
        }
    }, []);

    const createComment = (event) => {
        event.preventDefault();

        requestCreateComment(form, clear, getPostComments, post.id);
    };

    const showComments = postComments.length ? postComments.map((comment) => {
        return (
            <CommentCard
                key={comment.id}
                comment={comment}
            />
        )
    }) : <p>Não há comentários para este post. Seja a primeira pessoa a comentar!</p>

    return (
        <Main>
            <Header
                isProtected={true}
            />
            <hr />
            <button onClick={() => navigate(-1)}>Voltar</button>
            <section>
                <PostCard
                    key={post.id}
                    post={post}
                    isFeed={false}
                />
            </section>
            <section>
                <form onSubmit={createComment}>
                    <label htmlFor={"body"}> Comentário: </label>
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
                    <button type={"submit"}>Comentar</button>
                </form>
            </section>
            
            <section>
                {isLoading ? <p>CARREGANDO...</p> : showComments}
            </section>
        </Main>
    );
};

export default PostDetailsPage;