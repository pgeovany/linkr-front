import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';
import '../../assets/fonts.css';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [abilitado, setAbilitado] = useState(true);

  const navigate = useNavigate();

  function cadastrarUsuario(event) {
    event.preventDefault();
    setAbilitado(false);

    const dadosCadastrados = {
      email,
      password,
      userName,
      pictureUrl,
    };
    console.log(dadosCadastrados);

    if ((email || password || userName || pictureUrl) !== null) {
      const URL = 'localhost:5000/signup';
      const promise = axios.post(URL, dadosCadastrados);
      promise
        .then((_) => {
          navigate('/signin');
        })
        .catch((err) => {
          alert(err.response.data);
          setAbilitado(true);
        });
    }
  }

  return (
    <Conteudo>
      <div>
        <h1>Linkr</h1>
        <span>save, share and discover the best links on the web</span>
      </div>
      {abilitado ? (
        <DivFormulario>
          <Formulario onSubmit={cadastrarUsuario}>
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
            style={{
              textDecoration: '#ffffff',
              color: 'white',
              fontSize: '20px',
              fontWeight: '800',
              marginTop: '80px',
            }}
          >
            <span>Switch back to log in</span>
          </Link>
        </DivFormulario>
      ) : (
        <DivFormulario>
          <Formulario onSubmit={cadastrarUsuario}>
            <input type="email" placeholder="email" disabled />
            <input type="text" placeholder="password" disabled />
            <input type="text" placeholder="username" disabled />
            <input type="password" placeholder="picture url" disabled />
            <ThreeDots color="white" width="120" height={45} radius="9" />
          </Formulario>
          <Link
            to="/signin"
            style={{
              textDecoration: '#ffffff',
              color: 'white',
              fontSize: '20px',
              fontWeight: '800',
            }}
          >
            <span>Switch back to log in</span>
          </Link>
        </DivFormulario>
      )}
    </Conteudo>
  );
}

const Conteudo = styled.div`
  display: flex;

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
      font-family: 'Passion One', cursive;
      font-weight: 700;
      font-size: 106px;
      line-height: 84px;
    }
    span {
      font-family: 'Oswald', sans-serif;
      font-weight: 700;
      font-size: 43px;
      flex-wrap: wrap;
      line-height: 34px;
    }
    @media (max-width: 900px) {
      width: 100%;
      height: 200px;
      padding: 0px 20px;
      text-align: center;
      box-sizing: border-box;
      font-size: 23px;
      span {
        font-weight: 300;
      }
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
  justify-content: center;
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
  div {
    display: flex;
    max-width: 400px;
    height: 45px;
    justify-content: center;
    align-items: center;
    background-color: #1877f2;
    opacity: 0.7;
    border-radius: 4.6px;
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
    div {
      box-sizing: border-box;
      width: 350px;
    }
  }
`;
