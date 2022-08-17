import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components';
import { Sad } from 'react-ionicons';
import { Warning } from 'react-ionicons';
import ListPosts from './ListPosts';
import NewPostAlert from './NewPostAlert';
import UserContext from '../../../../context/UserContext';
import { deleteLocal } from '../../../../utils/localStorageFunctions';
import validateToken from '../../../../utils/validateToken';

export default function Posts({ token, idUser, userId }) {
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState([]);
  const [thereArePosts, setThereArePosts] = useState('loading');
  const { updateListPosts } = useContext(UserContext);
  const [postsLength, setPostsLength] = useState(0);

  useEffect(() => {
    console.log(`update ${updateListPosts}`);
    const API_URL = process.env.REACT_APP_API_URL;
    let config = {
      headers: {
        Authorization: `Bearer ${token || ''}`,
      },
      params: { id: idUser },
    };

    const promise = axios.get(`${API_URL}/posts`, config);
    promise
      .then((res) => {
        const Posts = res.data;
        if (Posts.length === 0) {
          return setThereArePosts('empty');
        }
        setThereArePosts('loaded');
        console.log(Posts);
        setAllPosts(Posts);
        setPostsLength(Posts.length);
      })
      .catch((err) => {
        setThereArePosts('warning');
        //validateToken(err, navigate);
      });
  }, [updateListPosts, userId]); // eslint-disable-line

  return (
    <>
      {thereArePosts === 'loading' ? (
        <Spiner>
          <TailSpin color="#707070" width={140} height={130} />
        </Spiner>
      ) : thereArePosts === 'empty' ? (
        <Empty>
          <Sad color="white" width="50px" height="40px" />
          <h2>There are no posts yet</h2>
        </Empty>
      ) : thereArePosts === 'warning' ? (
        <WarningDiv>
          <Warning color="yellow" width="50px" height="40px" />
          <h2>
            An error occured while trying to fetch the posts, please refresh the
            page
          </h2>
        </WarningDiv>
      ) : (
        <>
        {allPosts ? <NewPostAlert postsLength={postsLength} setPostsLength={setPostsLength}/> : null}
        {allPosts?.map((post, id) => (
          <ListPosts
            key={id}
            idPost={post.id}
            name={post.user.name}
            postUser={post.user.id}
            userId={userId}
            conteudo={post.content}
            picture={post.user.picture}
            url={post.url}
            urlTitle={post.urlTitle}
            urlImage={post.urlImage}
            urlDescription={post.urlDescription}
            token={token}
            likedBy={post.likedBy}
            likes={post.likes}
            isLikedByCurrentUser={post.is_liked}
          />
        ))}
        </>
      )}
          
    </>
  );
}

const Spiner = styled.div`
  width: 100%;
  height: 100mm;
  margin-top: 30px;
  display: flex;
  padding-top: 25px;
  box-sizing: border-box;
  justify-content: center;
`;

const Empty = styled.div`
  width: 100%;
  height: 100mm;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  color: white;
  font-family: 'Lato';
  font-weight: 700;
  font-size: 25px;
  box-sizing: border-box;
  align-items: center;
`;
const WarningDiv = styled.div`
  width: 100%;
  height: 100mm;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  color: white;
  font-family: 'Lato';
  font-weight: 700;
  font-size: 25px;
  box-sizing: border-box;
  align-items: center;
  text-align: center;
`;
