import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import styled from 'styled-components';
import UserContext from '../../../context/UserContext';

function HashtagItem({ id, name }) {
    return (
        <p><Link to={`/hashtag/${name}`}># {name}</Link></p>
    )
}

export default function HashtagsBox() {
    const [hashtags, setHashtags] = useState([]);
    const { token } = useContext(UserContext);
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const config = {
            headers: {
              Authorization: `Bearer ${token || ''}`,
            },
        };

        const promise = axios.get(`${API_URL}/trending`, config)
        promise.then(res => {
            setHashtags(res.data)
            console.log(res.data)
        });
        promise.catch(err => {
            navigate('/')
        })
    },[])

    
    return (
        <>
            <HashtagsBoxArea>
                <HashtagsBoxContainer>
                    <section>
                        trending
                    </section>
                    {
                        hashtags ? hashtags.map((hashtag, index) => (
                            <HashtagItem 
                            key={index}
                            id={hashtag.id}
                            name={hashtag.name} 
                            />
                        )) : null
                    }
                </HashtagsBoxContainer>
            </HashtagsBoxArea>
            
        </>
    )
}

const HashtagsBoxArea = styled.aside`
    min-width: 25%;
    margin-left: 25px;
    section {
        font-family: 'Oswald', sans-serif;
        font-size: 27px;
        font-weight: 700;
        color: #FFFFFF;
        height: 61px;
        display: flex;
        align-items: center;
        justify-content: left;
        padding-left: 16px;
        margin-bottom: 20px;
        border-bottom: 1px solid #484848;
    }
    @media (max-width: 900px) {
        display: none;
    }
`


const HashtagsBoxContainer = styled.div`
    background-color: #171717;
    width: 301px;
    height: 406px;
    border-radius: 16px;
    position: fixed;
    top: 240px;
    margin: 0px 20px 0 0;
    a {
        font-family: 'Oswald', sans-serif;
        font-size: 19px;
        font-weight: 400;
        color: #FFFFFF;
        padding-left: 16px;
        line-height: 34px;
        cursor: pointer;
        text-decoration: none;
    }

`