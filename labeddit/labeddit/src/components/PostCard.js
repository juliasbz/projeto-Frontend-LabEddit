import { format } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalStateContext from "../global/GlobalStateContext";
import { requestChangePostVote, requestCreatePostVote, requestDeletePostVote } from '../services/requests';
import { goToPostDetailsPage } from '../routes/coordinator';
import styled from 'styled-components';

const Article = styled.article`
display: flex;
flex-direction: row;
justify-content: center;
padding: 1%;
`

const Card = styled.div`
display: flex;
flex-direction: column;
align-items: center;
border-style: solid;
border-color: #e78100;
padding: 1%;

button{
    background-color:#e78100;
    border: solid white;
	border-radius:12px;
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

const Button = styled.main`
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

function PostCard(props) {
    const navigate = useNavigate();
    const { setters, getters } = useContext(GlobalStateContext);
    const [isDownVoted, setIsDownVoted] = useState(false);
    const [isUpVoted, setIsUpVoted] = useState(false);
    const { setPost } = setters;
    const { getPosts } = getters;
    const { id, userId, title, body,
        createdAt, voteSum, commentCount, userVote } = props.post;

    const date = createdAt && format(new Date(createdAt), "dd/MM/yyyy");

    useEffect(() => {
        if (userVote) {
            userVote === 1 ? setIsUpVoted(true) : setIsDownVoted(true);
        };
    }, [userVote]);

    const goToComments = () => {
        setPost(props.post);
        goToPostDetailsPage(navigate, id);
    };

    const chooseVote = (typeVote) => {
        if (typeVote === "up") {
            if (isDownVoted) {
                requestChangePostVote(id, 1, getPosts);
                setIsUpVoted(true);
                setIsDownVoted(false);
            } else {
                requestCreatePostVote(id, 1, getPosts);
                setIsUpVoted(true);
            };
        } else {
            if (isUpVoted) {
                requestChangePostVote(id, -1, getPosts);
                setIsDownVoted(true);
                setIsUpVoted(false);
            } else {
                requestCreatePostVote(id, -1, getPosts);
                setIsDownVoted(true);
            };
        };
    };

    const removeVote = (typeVote) => {
        requestDeletePostVote(id, getPosts);
        typeVote === "up" ? setIsUpVoted(false) : setIsDownVoted(false);
    };

    const showVoteButtons = props.isFeed && (
        <Button>
            {userVote && isDownVoted ?
                <button onClick={() => removeVote("down")}>Remover voto "Não Gostei"</button>
                : <button onClick={() => chooseVote("down")}>
                    {isUpVoted ? `Mudar voto para "Não Gostei"` : `Não gostei`}
                </button>
            }
            
            {userVote && isUpVoted ?
                <button onClick={() => removeVote("up")}>Remover voto "Gostei"</button>
                : <button onClick={() => chooseVote("up")}>
                    {isDownVoted ? `Mudar voto para "Gostei"` : `Gostei`}
                </button>
            }
        </Button>
    );

    return (
            <Article>
                <Card>
                    <h3>{title}</h3>
                    <span><b>Autor: </b>{userId}</span>
                    <p>Criado em {date}</p>
                    <img src={"https://picsum.photos/200/300?random=" + id} alt="Imagem aleatória do post" />
                    <p><b>Descrição: </b>{body}</p>
                    <p>Votos: {voteSum ? voteSum : 0}</p>
                    {showVoteButtons}
                    <p>Comentários: {commentCount ? commentCount : 0}</p>
                    {props.isFeed && <button onClick={goToComments}>Comentários</button>}
                </Card>
            </Article>
    );
};

export default PostCard;