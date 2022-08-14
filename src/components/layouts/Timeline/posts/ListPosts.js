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
import { useNavigate } from 'react-router-dom';

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
  reactToPost,
}) {
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
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
              onClick={() => {
                setLike(!like);
                reactToPost(idPost);
              }}
            />
          ) : (
            <HeartOutline
              color="white"
              width="70px"
              height="30px"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setLike(!like);
                reactToPost(idPost);
              }}
            />
          )}
          <span>13 likes</span>
        </Actions>
        <UserTitle>
          <h2
            onClick={() =>
              navigate(`/user/${idUser}`, {
                state: { id: idUser, name, image: picture },
              })
            }
          >
            {name}
          </h2>
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
