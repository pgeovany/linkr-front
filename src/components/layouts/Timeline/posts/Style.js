import styled from 'styled-components';
import ProfilePicture from '../../../shared/ProfilePicture';

const ContainerPost = styled.div`
  width: 100%;
  min-height: 276px;
  padding: 18px 18px 18px 18px;
  background: #171717;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-top: 60px;
  display: flex;
  position: relative;
  z-index: 2;

  @media (max-width: 900px) {
    border-radius: 0px;
    height: 276px;
  }
`;

const Actions = styled.div`
  min-height: 276px;
  display: flex;
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

const PostProfilePicture = styled(ProfilePicture)``;

const UserTitle = styled.div`
  height: 40%;
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
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContainerContents = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

const BoxContents = styled.div`
  width: 100%;
  min-height: 160px;
  box-sizing: border-box;
  border: 1px solid #4d4d4d;
  background: #171717;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  font-family: 'Lato';
  @media (max-width: 900px) {
    min-height: 150px;
  }
`;

const Box = styled.div`
  width: 100%;
  padding: 15px 10px;
  box-sizing: border-box;
  h2 {
    width: 100%;
    color: white;
    font-weight: 400;
    font-size: 16px;
    color: #cecece;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }
  p {
    width: 100%;
    color: white;
    font-weight: 400;
    font-size: 12px;
    color: #9b9595;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }
  a {
    width: 100%;
    flex-wrap: wrap;
    text-decoration: none;
    color: white;
  }
  @media (max-width: 900px) {
    max-width: 115px;
    max-height: 115px;
    h2,
    p,
    a {
      width: 40%;
      font-size: 12px;
      flex-wrap: wrap;
    }
  }
`;

const ProfileLink = styled.img`
  width: 20%;
  height: 100%;
  border-radius: 0px 12px 13px 0px;
`;

const EditInput = styled.input`
  background-color: white;
  color: black;
  border-radius: 5px;
  height: 46px;
  width: 260%;
  border: none;
  padding-left: 12px;
  margin-top: 20px;
  font-size: 14px;
  color: black;

  ::placeholder {
    font-size: 14px;
    color: #949494;
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const RepostHeader = styled.div`
  width: 100%;
  height: 42px;
  padding: 20px 18px 10px 18px;
  background-color: #1e1e1e;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  position: absolute;
  top: -30px;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;

  font-family: 'Lato';
  font-size: 16px;
  color: white;

  @media (max-width: 900px) {
    z-index: -1;
  }
`;

export {
  ContainerPost,
  Actions,
  PostProfilePicture,
  UserTitle,
  Header,
  Title,
  ContainerContents,
  BoxContents,
  Box,
  ProfileLink,
  EditInput,
  RepostHeader,
};
