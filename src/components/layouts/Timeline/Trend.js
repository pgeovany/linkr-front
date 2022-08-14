import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from "axios";

import UserContext from '../../../context/UserContext';


import Navbar from '../../layouts/Navbar/Navbar';
import HashtagsBox from './HashtagsBox';
import TrendingPosts from './posts/TrendingPosts';


export default function Trend(){
    const trendName = useParams().hashtag;
    const { token, image, setUsername, setToken, setImage } = useContext(UserContext);
    const [activeMenu, setActiveMenu] = useState(false);
    const [renderUserList, setRenderUserList] = useState(false);

 








    return(
        <>
            <Navbar
                token={token}
                image={image}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                renderUserList={renderUserList}
                setRenderUserList={setRenderUserList}
            />
            <TimelineContainer
                onClick={() => {
                if (activeMenu) {
                    setActiveMenu(false);
                }
                if (renderUserList) {
                    setRenderUserList(false);
                }
                }}
            >
                <Feed>
                    <FeedTitle># {trendName}</FeedTitle>
                    <TrendingPosts token={token} trendName={trendName} />             
                </Feed>
                <HashtagsBox />
            </TimelineContainer>
        </>  
    )
}

const TimelineContainer = styled.div`
  margin-top: 72px;
  width: 100%;
  background-color: #333333;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Feed = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  width: 48%;

  @media (max-width: 900px) {
    width: 100%;
    margin-top: 34px;
  }
`;

const FeedTitle = styled.h1`
  font-family: 'Oswald';
  font-size: 44px;
  font-weight: 700;
  color: white;
  margin-bottom: 44px;

  @media (max-width: 900px) {
    margin-left: 20px;
    margin-bottom: 30px;
    font-size: 32px;
  }
`;