import styled from 'styled-components';

const ProfilePicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;

  &&:hover {
    cursor: pointer;
  }
`;

export default ProfilePicture;
