import { AiOutlineComment } from "react-icons/ai";
import styled from "styled-components";

export default function CommentButton({showComments, setShowComments}) {
    return (
        <CommentContainer onClick={() => setShowComments(!showComments)}>
            <AiOutlineComment size={35} color={'#ffffff'} />
        </CommentContainer>
    )

}

const CommentContainer = styled.div`
    cursor: pointer;
`