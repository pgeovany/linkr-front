import { useState, useEffect } from 'react';
import axios from 'axios';
import ListPosts from './ListPosts';
import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components';
import { Sad } from 'react-ionicons';

export default function Posts({ image, token }) {
  const [allPosts, setAllPosts] = useState([]);
  const [thereArePosts, setThereArePosts] = useState('loading');
  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL;
    const config = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibm9tZSI6Imx1Y2FzIiwiZW1haWwiOiJsdWNhcy45Y2FicmFsNDFAZ21haWwuY29tIiwic2VuaGEiOiIkMmIkMTAkQy5aTjlCWVQxdXhhNkh4SlN3RkVET1hlQzRpcVZ3NEsva2ZUTmdpaThFdjdrN1RMZWg0UjIiLCJmb3RvIjoiaHR0cHM6Ly9vYnNlcnZhdG9yaW9kb2NpbmVtYS51b2wuY29tLmJyL3dwLWNvbnRlbnQvdXBsb2Fkcy8yMDIxLzA3L2RyYWdvbi1iYWxsLXN1cGVyLTEyMDB4OTAwLTEuanBnIiwiY3JpYWRvX2VtIjoiMjAyMi0wOC0xMFQyMDowMjo0OS4wNThaIiwiaWF0IjoxNjYwMzEyNDY5LCJleHAiOjE2NjAzOTg4Njl9.H27e-0oS4NloL05UNlmT3rZw-AAJbMNJQ9CKxLueC1A`,
      },
    };

    const promise = axios.get(`${API_URL}/posts`, config);
    promise
      .then((res) => {
        const Posts = res.data;
        if (Posts.length === 0) {
          setThereArePosts('empty');
        } else {
          setAllPosts(Posts);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [allPosts]);
  console.log(allPosts);
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
      ) : (
        <ListPosts />
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
