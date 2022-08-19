import { useContext, useEffect, useState } from 'react';
import { Heart } from 'react-ionicons';
import { HeartOutline, Trash, Create } from 'react-ionicons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../../../context/UserContext.js';
import styled from 'styled-components';
import { HiRefresh } from 'react-icons/hi';
import useInterval from 'use-interval';

export default function ListPostsAlert({ postsLength }) {
  const counter = postsLength;
  const [lengthCounter, setLengthCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updateListPosts, setUpdateListPosts, token, userId } =
    useContext(UserContext);

  function update() {
    setUpdateListPosts(updateListPosts + 1);
    setLengthCounter(0);
  }

  function RenderButton() {
    return (
      <>
        {lengthCounter !== 0 ? (
          <NewPostsButton onClick={update}>
            <p>{lengthCounter} new posts, load more!</p>
            <HiRefresh />
          </NewPostsButton>
        ) : (
          <></>
        )}
      </>
    );
  }

  useInterval(() => {
    const API_URL = process.env.REACT_APP_API_URL;
    let config = {
      headers: {
        Authorization: `Bearer ${token || ''}`,
      },
    };

    const promise = axios.get(`${API_URL}/posts`, config);
    promise.then((res) => {
      const Posts = res.data;
      const filteredPosts = Posts.filter((post) => {
        if (post.isRepost) {
          return post.repostOwnerId === userId || post.follows_who_reposted;
        }
        return (
          post.is_follower ||
          post.user.id === userId ||
          post.repostOwnerId === userId
        );
      });
      if (postsLength !== filteredPosts.length) {
        // 8 !== 9
        const lengthDifference = filteredPosts.length - postsLength;
        if (lengthDifference > 0) {
          // 9 - 8 = 1
          setLengthCounter(lengthDifference);
          setIsLoading(true);
        }
      } else {
        //setLengthCounter(0);
        setIsLoading(false);
      }
    });
    promise.catch((err) => {
      //validateToken(err, navigate);
    });
  }, 5000);

  return <>{isLoading ? RenderButton() : <></>}</>;
}

const NewPostsButton = styled.div`
  width: 100%;
  height: 61px;
  background-color: #1877f2;
  font-family: 'Lato';
  font-weight: 400;
  font-size: 16px;
  color: white;
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 40px;
  cursor: pointer;
  p {
    margin-right: 10px;
  }
`;
