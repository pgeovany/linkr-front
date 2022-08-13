import {
  ContainerPost,
  ContainerContents,
  Title,
  Actions,
  PostProfilePicture,
  BarraInvisivel,
  BoxContents,
  UserTitle,
  Box,
  ProfileLink,
} from './Style.js';
import { useState } from 'react';
import { Heart } from 'react-ionicons';
import { HeartOutline } from 'react-ionicons';
import axios from 'axios';

export default function ListPosts({
  idPost,
  name,
  conteudo,
  picture,
  url,
  urlTitle,
  urlImage,
  urlDescription,
  token,
}) {
  const [like, setLike] = useState(false);

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
        await axios.post(`${API_URL}`, body, config);
        setLike(!like);
      } catch (error) {
        alert('Ocorreu um erro ao tentar dar um like no post');
      }
    } else {
      try {
        await axios.delete(`${API_URL}`, body, config);
        setLike(!like);
      } catch (error) {
        alert('Ocorreu um erro ao tentar dar um deslike no post');
      }
    }
  }

  return (
    <ContainerPost id={idPost}>
      <Title>
        <Actions>
          <PostProfilePicture src={picture} alt="profile" />
          {like ? (
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
              onClick={() => setLike(!like)}
            />
          )}
          <span>13 likes</span>
        </Actions>
        <UserTitle>
          <h2>{name}</h2>
          <p>{conteudo}</p>
        </UserTitle>
      </Title>
      <ContainerContents>
        <BarraInvisivel></BarraInvisivel>
        <BoxContents>
          <Box>
            <h2>{urlTitle}</h2>
            <p>{urlDescription}</p>
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
