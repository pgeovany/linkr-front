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
import { useContext, useEffect } from 'react';
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
  isLikedByCurrentUser,
}) {
  // const [editContent, setEditContent] = useState(false);
  // const inputRef = useRef();
  const peopleLiked = likedBy.length;
  const postByUser = postUser === userId;
  const navigate = useNavigate();
  const { setUpdateListPosts, updateListPosts } = useContext(UserContext);
  const tagStyle = {
    color: '#b7b7b7',
    fontWeight: 700,
    cursor: 'pointer',
  };

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  function verificaLikes() {
    if (peopleLiked === 0) {
      return null;
    } else if (isLikedByCurrentUser) {
      if (peopleLiked === 1) {
        return `Você curtiu esse post`;
      }
      if (peopleLiked === 2) {
        return `Você e ${likedBy.find(
          (user) => user.id !== userId
        )} curtiram esse post`;
      }
      if (peopleLiked >= 3) {
        return `Você, ${likedBy[0]} e outras ${
          peopleLiked - 2
        } pessoas curtiram`;
      }
    } else {
      if (peopleLiked === 1) {
        return `${likedBy[0]} curtiu esse post`;
      }
      if (peopleLiked === 2) {
        return `${likedBy[0]} e ${likedBy[1]} curtiram esse post`;
      }
      if (peopleLiked >= 3) {
        return `${likedBy[0]}, ${likedBy[1]} e outras ${
          peopleLiked - 2
        } pessoas curtiram`;
      }
    }
  }

  function renderLikeButton() {
    if (isLikedByCurrentUser) {
      return (
        <Heart
          color="#AC0000"
          width="70px"
          height="30px"
          style={{ cursor: 'pointer' }}
          onClick={likePost}
        />
      );
    }

    return (
      <HeartOutline
        color="white"
        width="70px"
        height="30px"
        style={{ cursor: 'pointer' }}
        onClick={likePost}
      />
    );
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
    if (!isLikedByCurrentUser) {
      try {
        await axios.post(`${API_URL}/likes`, body, config);
        setUpdateListPosts(updateListPosts + 1);
      } catch (error) {
        alert('Ocorreu um erro ao tentar dar um like no post');
      }
    } else {
      try {
        await axios.delete(`${API_URL}/likes/${idPost}`, config);
        setUpdateListPosts(updateListPosts - 1);
      } catch (error) {
        alert('Ocorreu um erro ao tentar dar um deslike no post');
      }
    }
  }

  return (
    <ContainerPost id={idPost}>
      <Actions>
        <PostProfilePicture src={picture} alt="profile" />
        {renderLikeButton()}
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
