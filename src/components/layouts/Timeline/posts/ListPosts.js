import {
  ContainerPost,
  ContainerContents,
  Actions,
  PostProfilePicture,
  BoxContents,
  UserTitle,
  NameUser,
  Box,
  ProfileLink,
} from './Style.js';
import { useState } from 'react';
import { Heart } from 'react-ionicons';
import { HeartOutline, Trash, Create } from 'react-ionicons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import { ReactTagify } from 'react-tagify';
import ReactTooltip from 'react-tooltip';
import deletePost from './DeletePost.js';

export default function ListPosts({
  idPost,
  name,
  idUser,
  conteudo,
  picture,
  url,
  urlTitle,
  urlImage,
  urlDescription,
  token,
  likes,
  likedBy,
}) {
  const [like, setLike] = useState(false);
  const userLikePost = idUser === idPost;
  const peopleLiked = likedBy.length;

  async function likePost() {
    const API_URL = process.env.REACT_APP_API_URL;
    const config = {
      headers: {
        Authorization: `Bearer ${token || ''}`,
      },
    };
    const body = {
      idPost,
    };
    if (like === false) {
      try {
        await axios.post(`${API_URL}/likes`, body, config);
        setLike(!like);
      } catch (error) {
        alert('Ocorreu um erro ao tentar dar um like no post');
      }
    } else {
      try {
        await axios.delete(`${API_URL}/likes/${idPost}`, config);
        setLike(!like);
      } catch (error) {
        alert('Ocorreu um erro ao tentar dar um deslike no post');
      }
    }
  }

  const navigate = useNavigate();
  const tagStyle = {
    color: '#b7b7b7',
    fontWeight: 700,
    cursor: 'pointer',
  };

  return (
    <ContainerPost id={idPost}>
      <Actions>
        <PostProfilePicture src={picture} alt="profile" />
        {userLikePost ? (
          <Heart
            color="#AC0000"
            width="70px"
            height="30px"
            style={{ cursor: 'pointer' }}
          />
        ) : like ? (
          <Heart
            color="#AC0000"
            width="70px"
            height="30px"
            style={{ cursor: 'pointer' }}
            onClick={likePost}
          />
        ) : (
          <HeartOutline
            color="white"
            width="70px"
            height="30px"
            style={{ cursor: 'pointer' }}
            onClick={likePost}
          />
        )}
        <span
          data-tip={
            peopleLiked === 0
              ? ''
              : userLikePost
              ? `Você,${likedBy[0]} e outras ${
                  peopleLiked - 2
                } pessoas curtiram`
              : `${likedBy[0]},${likedBy[1]} e outras ${
                  peopleLiked - 2
                } pessoas curtiram`
          }
        >
          {likes} likes
        </span>
        <ReactTooltip
          place="bottom"
          borderColor="rgba(255, 255, 255, 0.9)"
          backgroundColor="rgba(255, 255, 255, 0.9)"
          textColor="#505050"
        />
      </Actions>
      <ContainerContents>
        <UserTitle>
          <NameUser>
            <h2
              onClick={() =>
                navigate(`/user/${idUser}`, {
                  state: { id: idUser, name, image: picture },
                })
              }
            >
              {name}
            </h2>
            {userLikePost ? (
              <div>
                <Create
                  color="white"
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                />
                <Trash
                  color="white"
                  style={{ cursor: 'pointer' }}
                  onClick={() => deletePost(token, idUser, idPost)}
                />
              </div>
            ) : (
              ''
            )}
          </NameUser>
          <p>{conteudo}</p>
          <h2
            onClick={() =>
              navigate(`/user/${idUser}`, {
                state: { id: idUser, name, image: picture },
              })
            }
          >
            {name}
          </h2>
          <ReactTagify
            tagStyle={tagStyle}
            tagClicked={(tag) => navigate(`/hashtag/${tag.replace('#', '')}`)}
          >
            <p>{conteudo}</p>
          </ReactTagify>
        </UserTitle>
        <BoxContents>
          <Box>
            <h2>{urlTitle}</h2>
            <div>
              <p>{urlDescription}</p>
            </div>
            <a href={url} target="blank">
              {url}
            </a>
          </Box>
          <ProfileLink src={urlImage} alt="ProfileLink" />
        </BoxContents>
      </ContainerContents>
    </ContainerPost>
  );
}
