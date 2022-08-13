import styled from 'styled-components';
import ProfilePicture from '../../../shared/ProfilePicture';
const ContainerPost = styled.div`
  width: 100%;
  min-height: 276px;
  padding: 18px 18px 18px 18px;
  background: #171717;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-top: 28px;
  flex-direction: column;
  @media (max-width: 900px) {
    border-radius: 0px;
    height: 276px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Actions = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 15px;

  img {
    margin-bottom: 15px;
  }
  span {
    color: white;
    font-family: 'Lato';
  }
`;

const PostProfilePicture = styled(ProfilePicture)`
  @media (max-width: 900px) {
    display: none;
  }
`;

const UserTitle = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 15px;
  h2 {
    color: white;
    font-weight: 400;
    font-size: 19px;
    font-family: 'Lato';
    flex-wrap: wrap;
    margin-bottom: 10px;

    :hover {
      cursor: pointer;
    }
  }
  p {
    color: white;
    font-weight: 400;
    font-size: 17px;
    color: #b7b7b7;
    font-family: 'Lato';
    flex-wrap: wrap;
  }
`;
const ContainerContents = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const BoxContents = styled.div`
  max-width: 503px;
  max-height: 155px;
  box-sizing: border-box;
  border: 1px solid #4d4d4d;
  background: #171717;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  font-family: 'Lato';
`;
const BarraInvisivel = styled.div`
  background-color: white;
  max-height: 155px;
  max-width: 200px;
`;
const Box = styled.div`
  padding: 15px 15px;
  box-sizing: border-box;
  h2 {
    color: white;
    font-weight: 400;
    font-size: 16px;
    color: #cecece;
    margin-bottom: 10px;
  }
  p {
    color: white;
    font-weight: 400;
    font-size: 12px;
    color: #9b9595;
    margin-bottom: 10px;
  }
  a {
    text-decoration: none;
    color: white;
  }
`;

const ProfileLink = styled.img`
  max-width: 153.44px;
  max-height: 153px;
  border-radius: 0px 12px 13px 0px;
`;

export {
  ContainerPost,
  Title,
  Actions,
  PostProfilePicture,
  UserTitle,
  ContainerContents,
  BoxContents,
  BarraInvisivel,
  Box,
  ProfileLink,
};
