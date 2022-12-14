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
  EditInput,
  RepostHeader,
} from './Style.js';
import { BiRepost } from 'react-icons/bi';
import { useContext, useEffect, useState } from 'react';
import { Heart } from 'react-ionicons';
import { HeartOutline, Trash, Create } from 'react-ionicons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { ReactTagify } from 'react-tagify';
import ReactTooltip from 'react-tooltip';
import deletePost from './DeletePost.js';
import UserContext from '../../../../context/UserContext.js';
import NewRepost from './NewRepost.js';
import CommentsBox from '../comments/CommentsBox.js';
import CommentButton from '../comments/CommentButton.js';

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
  isFollower,
  isRepost,
  repostedBy,
  repostOwnerId,
  followsRepostOwner,
  repostInfo,
  userPage,
  commentsCounter,
}) {
  const navigate = useNavigate();
  const { setUpdateListPosts, updateListPosts, updateComments } =
    useContext(UserContext);

  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [sanitizedContent, setSanitizedContent] = useState('');
  const peopleLiked = likedBy.length;
  const postByUser = postUser === userId;
  const [showComments, setShowComments] = useState(updateComments);

  const tagStyle = {
    color: '#b7b7b7',
    fontWeight: 700,
    cursor: 'pointer',
  };

  useEffect(() => {
    if (conteudo) {
      const newSanitizedContent = conteudo.replace(/[^a-zA-Z0-9(_#)]/g, ' ');
      setSanitizedContent(newSanitizedContent);
    }
  }, [conteudo]);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  function verificaLikes() {
    if (peopleLiked === 0) {
      return null;
    } else if (isLikedByCurrentUser) {
      if (peopleLiked === 1) {
        return `Voc?? curtiu esse post`;
      }
      if (peopleLiked === 2) {
        return `Voc?? e ${likedBy[0]} curtiram esse post`;
      }
      if (peopleLiked >= 3) {
        return `Voc??, ${likedBy[0]} e outras ${
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

  async function submmitPostEdit() {
    setIsDisabled(true);
    try {
      const API_URL = process.env.REACT_APP_API_URL;

      const config = {
        headers: {
          Authorization: `Bearer ${token || ''}`,
        },
      };

      const body = { content: editedContent };

      await axios.put(`${API_URL}/posts/${idPost}`, body, config);
      setIsDisabled(false);
      setEditing(false);
      setShowComments(false);
      setUpdateListPosts(updateListPosts + 1);
    } catch (error) {
      alert('Erro ao editar o post!');
      setIsDisabled(false);
    }
  }

  function HandleTag(tag) {
    const tagName = tag.replace(/[^a-zA-Z0-9(_)]/g, '');
    navigate(`/hashtag/${tagName}`);
  }

  function renderContent() {
    if (sanitizedContent && !editing) {
      return (
        <ReactTagify tagStyle={tagStyle} tagClicked={(tag) => HandleTag(tag)}>
          <p>{sanitizedContent}</p>
        </ReactTagify>
      );
    }
    if (editing) {
      return (
        <EditInput
          disabled={isDisabled}
          placeholder="test"
          type="text"
          autoFocus
          onChange={(e) => setEditedContent(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Escape') {
              setEditing(false);
              setEditedContent('');
            }
            if (e.key === 'Enter') {
              submmitPostEdit();
            }
          }}
        />
      );
    }
    return null;
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
    <>
      {userPage && isRepost ? null : isRepost &&
        (followsRepostOwner || repostOwnerId === userId) ? (
        <ContainerPost id={idPost}>
          <RepostHeader>
            <BiRepost
              color="white"
              font-size={24}
              style={{ cursor: 'pointer' }}
            />
            <h1>
              re-posted by {repostOwnerId === userId ? 'you' : repostedBy}
            </h1>
          </RepostHeader>

          <Actions>
            <PostProfilePicture src={picture} alt="profile" />
            <HeartOutline
              color="white"
              width="70px"
              height="30px"
              style={{ cursor: 'pointer' }}
            />

            <span data-tip={verificaLikes()}>{repostInfo.likes} likes</span>
            <CommentButton
              showComments={showComments}
              setShowComments={setShowComments}
              commentsCounter={commentsCounter}
            />
            <BiRepost
              color="white"
              font-size={30}
              style={{ cursor: 'pointer' }}
            />
            <span>{repostInfo.reposts} re-post</span>
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
                        state: {
                          id: postUser,
                          name,
                          image: picture,
                          isFollower,
                        },
                      })
                    }
                  >
                    {name}
                  </h2>
                  {renderContent()}
                </Title>
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
      ) : (
        <>
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
              <CommentButton
                showComments={showComments}
                setShowComments={setShowComments}
                commentsCounter={commentsCounter}
              />
              <BiRepost
                color="white"
                font-size={30}
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  NewRepost(idPost, token, setUpdateListPosts, updateListPosts)
                }
              />
              <span>{repostInfo?.reposts} re-post</span>
            </Actions>
            <ContainerContents>
              <UserTitle>
                <Header>
                  <Title>
                    <h2
                      onClick={() =>
                        navigate(`/user/${postUser}`, {
                          state: {
                            id: postUser,
                            name,
                            image: picture,
                            isFollower,
                          },
                        })
                      }
                    >
                      {name}
                    </h2>
                    {renderContent()}
                  </Title>
                  {postByUser ? (
                    <div>
                      <Create
                        color="white"
                        style={{ cursor: 'pointer', marginRight: '10px' }}
                        onClick={() => {
                          setEditing(!editing);
                        }}
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
          {showComments ? (
            <CommentsBox idPost={idPost} userId2={userId} />
          ) : null}
        </>
      )}
    </>
  );
}
