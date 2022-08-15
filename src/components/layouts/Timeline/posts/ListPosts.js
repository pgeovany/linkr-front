import {
  ContainerPost,
  ContainerContents,
  Actions,
  PostProfilePicture,
  BoxContents,
  UserTitle,
  Header,
  Box,
  ProfileLink,
  Title,
} from './Style.js';
import { useContext, useRef, useState, useEffect } from 'react';
import { Heart } from 'react-ionicons';
import { HeartOutline, Trash, Create } from 'react-ionicons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { ReactTagify } from 'react-tagify';
import ReactTooltip from 'react-tooltip';
import deletePost from './DeletePost.js';
import UserContext from '../../../../context/UserContext.js';

export default function ListPosts({
  idPost,
  name,
  postUser,
  userId,
  conteudo,
  picture,
  url,
  urlTitle,
  urlImage,
  urlDescription,
  token,
  likes,
  likedBy,
  islike,
}) {
  const [like, setLike] = useState(false);
  const [editContent, setEditContent] = useState(false);

  useEffect(() => {
    if (islike === userId) {
      setLike(true);
    }
  }, []);

  const userLikePost = postUser === islike;
  const peopleLiked = likedBy.length;
  const postByUser = postUser === userId;
  const { setUpdateListPosts, updateListPosts } = useContext(UserContext);
  const inputRef = useRef();

  function verificaLikes() {
    if (peopleLiked === 0) {
      return '';
    } else if (userLikePost && peopleLiked > 3) {
      return `Você,${likedBy[0]} e outras ${peopleLiked - 2} pessoas curtiram`;
    } else if (userLikePost && peopleLiked > 2) {
      return `Você,${likedBy[0]} e outras ${peopleLiked - 2} pessoas curtiram`;
    } else if (peopleLiked === 1 && userLikePost) {
      return 'Você curtiu esse post';
    } else {
      return `${likedBy[0]},${likedBy[1]} e outras ${
        peopleLiked - 2
      } pessoas curtiram`;
    }

    // peopleLiked === 0
    //   ? ''
    //   : userLikePost
    //   ? `Você,${likedBy[0]} e outras ${
    //       peopleLiked - 2
    //     } pessoas curtiram`
    //   : peopleLiked === 1 && userLikePost
    //   ? 'Você curtiu esse post'
    //   : `${likedBy[0]},${likedBy[1]} e outras ${
    //       peopleLiked - 2
    //     } pessoas curtiram`
  }

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
        setUpdateListPosts(updateListPosts + 1);
      } catch (error) {
        alert('Ocorreu um erro ao tentar dar um like no post');
      }
    } else {
      try {
        await axios.delete(`${API_URL}/likes/${idPost}`, config);
        setLike(!like);
        setUpdateListPosts(updateListPosts - 1);
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
            onClick={() => likePost()}
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
        <span data-tip={verificaLikes()}>{likes} likes</span>
        <ReactTooltip
          place="bottom"
          borderColor="rgba(255, 255, 255, 0.9)"
          backgroundColor="rgba(255, 255, 255, 0.9)"
          textColor="#505050"
        />
      </Actions>
      <ContainerContents>
        <UserTitle>
          <Header>
            <Title>
              <h2
                onClick={() =>
                  navigate(`/user/${postUser}`, {
                    state: { id: postUser, name, image: picture },
                  })
                }
              >
                {name}
              </h2>

              {conteudo ? (
                <ReactTagify
                  tagStyle={tagStyle}
                  tagClicked={(tag) =>
                    navigate(`/hashtag/${tag.replace('#', '')}`)
                  }
                >
                  <p>{conteudo}</p>
                </ReactTagify>
              ) : null}
            </Title>
            {postByUser ? (
              <div>
                <Create
                  color="white"
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                />
                <Trash
                  color="white"
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    deletePost(
                      token,
                      idPost,
                      setUpdateListPosts,
                      updateListPosts
                    )
                  }
                />
              </div>
            ) : (
              ''
            )}
          </Header>
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
