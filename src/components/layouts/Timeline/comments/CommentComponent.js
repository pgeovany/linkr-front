import { useNavigate, useLocation } from 'react-router-dom';
import styled from "styled-components";

export default function CommentComponent({ comment, userId }) {
    const { userId: id, content, commentOwner, commentOwnerImage, isFollowing } = comment;
    const navigate = useNavigate();

    return (
        <CommentContainer>  
            <UserImage image={commentOwnerImage}>

            </UserImage>
            <CommentBox>
                <CommentHeader>
                    <div onClick={() => navigate(`/user/${id}`, {
                        state: {
                            id, name: commentOwner, image: commentOwnerImage, isFollower: isFollowing,
                        }
                    })}>
                        { isFollowing ? <p>{commentOwner}<span> • following</span></p> : id === userId ? <p>{commentOwner}<span> • post’s author</span></p> : <p>{commentOwner}</p> }
                    </div>
                </CommentHeader>
                <span>{content}</span>
            </CommentBox>
        </CommentContainer>
    )
    
}

const CommentContainer = styled.div`
    width: 100%;
    display: flex;
    padding: 15px;
    font-family: 'Lato';
    border-bottom: 1px solid #353535;
`

const UserImage = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`

const CommentBox = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: 20px;
    span {
        font-size: 14px;
        font-weight: 400;
        color: #ACACAC;
    }
`

const CommentHeader = styled.div`
    padding: 3px 0;
    p {
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #F3F3F3;
        cursor: pointer;
    }
    span {
        color: #565656;
    }

`