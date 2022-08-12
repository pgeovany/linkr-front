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

export default function ListPosts() {
  const [like, setLike] = useState(false);
  return (
    <ContainerPost>
      <Title>
        <Actions>
          <PostProfilePicture src="" alt="profile" />
          {like ? (
            <Heart
              color="#AC0000"
              width="70px"
              height="30px"
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <HeartOutline
              color="white"
              width="70px"
              height="30px"
              style={{ cursor: 'pointer' }}
            />
          )}
          <span>13 likes</span>
        </Actions>
        <UserTitle>
          <h2>Juvenal Juvêncio </h2>
          <p>
            Muito maneiro esse tutorial de Material UI com React, deem uma
            olhada!
          </p>
        </UserTitle>
      </Title>
      <ContainerContents>
        <BarraInvisivel></BarraInvisivel>
        <BoxContents>
          <Box>
            <h2>Como aplicar o Material UI em um projeto React</h2>
            <p>
              Hey! I have moved this tutorial to my personal blog. Same content,
              new location. Sorry about making you click through to another
              page.
            </p>
            <a
              href="https://medium.com/@pshrmn/a-simple-react-router"
              target="blank"
            >
              https://medium.com/@pshrmn/a-simple-react-router
            </a>
          </Box>
          <ProfileLink
            src="https://observatoriodocinema.uol.com.br/wp-content/uploads/2021/07/dragon-ball-super-1200x900-1.jpg"
            alt="ProfileLink"
          />
        </BoxContents>
      </ContainerContents>
    </ContainerPost>
  );
}
