import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');

  return (
    <Conteudo>
      <div>
        <h1>Linkr</h1>
        <span>save, share and discover the best links on the web</span>
      </div>
      <DivFormulario>
        <Formulario>
          <input
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            placeholder="username"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <input
            placeholder="picture url"
            type="url"
            value={pictureUrl}
            onChange={(e) => setPictureUrl(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </Formulario>
        <Link
          to="/signin"
          style={{ textDecoration: '#ffffff', color: 'white' }}
        >
          <span>Switch back to log in</span>
        </Link>
      </DivFormulario>
    </Conteudo>
  );
}

const Conteudo = styled.div`
  display: flex;
  font-family: 'Oswald', sans-serif;
  div:nth-child(1) {
    width: 60%;
    color: #ffffff;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: black;
    box-sizing: border-box;
    padding: 0 80px;
    h1 {
      font-weight: 700;
      font-size: 106px;
    }
    span {
      font-weight: 700;
      font-size: 43px;
      flex-wrap: wrap;
    }
    @media (max-width: 900px) {
      width: 100%;
      height: 200px;
      padding: 20px 10px;
      text-align: center;
      box-sizing: border-box;
      font-size: 23px;
    }
  }
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const DivFormulario = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: black;
  width: 40%;
  height: 100vh;
  padding: 0 60px;
  box-sizing: border-box;
  background-color: #333333;
  position: relative;
  @media (max-width: 900px) {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #333333;
    width: 100%;
    height: 77.7vh;
  }
`;

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 20px;
  width: 100%;
  input {
    font-family: 'Oswald', sans-serif;
    height: 45px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 6px;
    font-weight: 400;
    font-size: 19.9px;
    padding-left: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
    max-width: 400px;
    color: #9f9f9f;
  }
  button {
    font-family: 'Oswald', sans-serif;
    height: 45px;
    background: #1877f2;
    border-radius: 4.6px;
    border: none;
    font-weight: 400;
    font-size: 20.9px;
    text-align: center;
    max-width: 400px;
    color: #ffffff;
    cursor: pointer;
  }
  @media (max-width: 900px) {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 0;
    input {
      box-sizing: border-box;
      width: 350px;
    }
    button {
      box-sizing: border-box;
      width: 350px;
    }
  }
`;
