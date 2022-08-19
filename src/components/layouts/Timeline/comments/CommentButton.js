import { AiOutlineComment } from "react-icons/ai";
import styled from "styled-components";

export default function CommentButton({showComments, setShowComments}) {
    return (
        <CommentContainer onClick={() => setShowComments(!showComments)}>
            <AiOutlineComment size={35} color={'#ffffff'} />
            <p>3 comments</p>
        </CommentContainer>
    )

}

const CommentContainer = styled.div`
    font-family: 'Lato';
    margin-top: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;    
    p {
        color: #ffffff;
        font-size: 11px;
        width: 100%;
        overflow: hidden;
`