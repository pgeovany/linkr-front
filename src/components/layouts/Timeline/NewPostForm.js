import styled from 'styled-components';
import ProfilePicture from '../../shared/ProfilePicture';

export default function NewPostForm({ image }) {
  function newPost(e) {
    e.preventDefault();
    alert('Oi');
  }

  return (
    <NewPostContainer>
      <ProfilePicture src={image} alt="profile" />
      <PostForm onSubmit={(e) => newPost(e)}>
        <h1>What are you going to share today?</h1>
        <Input placeholder="https:// ..." />
        <TallInput placeholder="Awesome article about #javascript" />
        <Button>Publish</Button>
      </PostForm>
    </NewPostContainer>
  );
}
const NewPostContainer = styled.div`
  width: 100%;
  height: 210px;
  padding: 18px 18px 18px 18px;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  display: flex;
`;

const PostForm = styled.form`
  padding-left: 20px;
  padding-top: 8px;
  width: 100%;
  height: 100%;
  position: relative;

  h1 {
    font-family: 'Lato';
    color: #707070;
    font-size: 20px;
    font-weight: 300;
    margin-bottom: 10px;
  }
`;

const Input = styled.input`
  background-color: #efefef;
  color: #949494;
  border-radius: 5px;
  height: 30px;
  width: 100%;
  border: none;
  padding-left: 12px;
  font-size: 14px;
  color: black;
  margin-bottom: 8px;

  ::placeholder {
    font-size: 14px;
    color: #949494;
  }
`;

const TallInput = styled(Input)`
  height: 60px;
  text-align: top;
  padding-bottom: 30px;
`;

const Button = styled.button`
  font-family: 'Lato';
  height: 30px;
  width: 112px;
  background: #1877f2;
  border-radius: 5px;
  border: none;

  position: absolute;
  right: 0;
  bottom: 0;

  font-weight: 700;
  font-size: 14px;
  color: #ffffff;

  &&:hover {
    cursor: pointer;
  }
`;
