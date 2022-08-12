import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import axios from "axios"
import { ThreeDots } from 'react-loader-spinner';
import UserContext from '../../context/UserContext';
import { setLocal, getLocal } from '../../utils/localStorageFunctions';
import'../../assets/fonts.css'

export default function Signin() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [loadingButton, setLoadingButton] = useState(false);

    const dadosUsuario = getLocal('linkrUserdata');
    const { setUsername, setToken, setImage } = useContext(UserContext);

    function Autologin(){
        if(dadosUsuario){
            setUsername(dadosUsuario.nome);
            setToken(dadosUsuario.token);
            setImage(dadosUsuario.foto);
            navigate('/timeline');
        }
    }
    useEffect(() => {Autologin()}, [])

    function HandleSubmit(e) {
        e.preventDefault()
        setLoadingButton(true);

        const API_URL = process.env.REACT_APP_API_URL;

        const data = {
            email,
            senha
        }
        if(email === "" || senha === ""){
            alert("Preencha todos os campos")
        }

        const promise = axios.post(`${API_URL}/login`, data)
        promise.then(res => {
            const { nome, token, foto } = res.data
            setLocal('linkrUserdata', {
                token: token,
                nome: nome,
                foto: foto
            });
            setUsername(nome)
            setToken(token)
            setImage(foto)
            setLoadingButton(false);
            navigate("/timeline")
        });
        promise.catch(err => {
            if(err.response.status === 401){
                alert("Usuário ou senha inválidos")
            }
            setLoadingButton(false);
        })
    }

    return (
        <Conteudo>
            <LogoArea>
                <h1>Linkr</h1>
                <span>save, share and discover <br></br> the best links on the web</span>
            </LogoArea>
            <DivFormulario>
                <Form onSubmit={HandleSubmit}>
                    <input type="text" placeholder="e-mail" value={email} disabled={loadingButton} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="password" value={senha} disabled={loadingButton} onChange={(e) => setSenha(e.target.value)}/>
                    {
                        loadingButton ? <button disabled={loadingButton}><ThreeDots color="white" width="120" height={45} radius="9" /></button> : <button type="submit">login In</button>
                    }
                </Form>
                <Link to='/signup'>First time? Create an account!</Link>
            </DivFormulario>
        </Conteudo>    
    )
}

const Conteudo = styled.div`
display: flex;
font-family: 'Oswald', sans-serif;
@media (max-width: 900px) {
  flex-direction: column;
}
`;

const LogoArea = styled.div`
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
  }
  span {
    font-weight: 700;
    font-size: 43px;
    flex-wrap: wrap;
    line-height: 1.2;

    @media (max-width: 900px) {
        font-size: 23px;
    }
  }
  @media (max-width: 900px) {
    width: 100%;
    height: 200px;
    padding: 20px 10px;
    text-align: center;
    box-sizing: border-box;
    font-size: 23px;
  }
`

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

  a {
    color: #ffffff;
    text-align: center;
  }

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 20px;
  width: 100%;
  input {
    font-family: 'Oswald', sans-serif;
    height: 45px;
    width: 100%;
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
    width: 100%;
    background: #1877f2;
    border-radius: 4.6px;
    border: none;
    font-weight: 400;
    font-size: 20.9px;
    text-align: center;
    max-width: 400px;
    color: #ffffff;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
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
