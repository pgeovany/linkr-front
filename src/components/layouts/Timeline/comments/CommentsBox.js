import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import styled from "styled-components";
import UserContext from '../../../../context/UserContext';

import CommentComponent from "./CommentComponent"
import CommentsForm from "./CommentsForm"


export default function CommentsBox( { idPost } ) {
    const [comments, setComments] = useState([])
    const { token, image, updateListPosts, userId, setUpdateComments, updateComments } = useContext(UserContext);
    console.log('atualizou comentários do post' + idPost)

    useEffect(() => {
        const API_URL = process.env.REACT_APP_API_URL;
        let config = {
            headers: {
                Authorization: `Bearer ${token || ''}`,
            },
        };
        const promise = axios.get(`${API_URL}/comments/${idPost}`, config);
        promise.then((res) => {
            setComments(res.data);
            setUpdateComments(true)
            console.log(res.data)
        });
        promise.catch((err) => {
            setComments([]);
        });
    },[updateComments])

    return (
        <CommentsContainer>
            {   
                updateComments ? 
                comments?.map((comment, index) => (
                    <CommentComponent key={index} comment={comment} userId={userId}/>
                )) : null
            }
            <CommentsForm image={image} idPost={idPost}/>
        </CommentsContainer>
    )
    
}

const CommentsContainer = styled.div`
    width: 100%;
    min-width: 500px;
    background-color: #1E1E1E;
    border-radius: 16px;
    padding: 45px 20px 5px 20px;
    box-sizing: border-box;
    margin-top: -25px;

    @media (max-width: 900px) {
        width: 81.5%;
        border-radius: 0px;
    }



`