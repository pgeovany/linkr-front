import styled from "styled-components";
import { HiRefresh } from 'react-icons/hi';
import { IoPaperPlaneOutline } from "react-icons/io5";

export default function CommentsForm( {image} ) {
    console.log(image)

    return (
        <FormContainer>
            <UserImage image={image}>
            </UserImage>
            <Form>
                <input type="text" placeholder="Write a comment..."/>
            </Form>
            <Icon>
                <IoPaperPlaneOutline />
            </Icon>
        </FormContainer>
    )
    
}

const FormContainer = styled.div`
    width: 100%;
    display: flex;
    padding: 20px 15px;
    font-family: 'Lato';
    position: relative;
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

const Form = styled.form`
    width: 100%;
    padding-left: 20px;


    input {
        width: 100%;
        height: 40px;
        border: none;
        border-radius: 8px;
        background-color: #252525;
    }

    input::placeholder {
        color: #575757;
        font-size: 14px;
        font-weight: 400;
        font-style: italic;
        padding-left: 20px;
    }
`

const Icon = styled.div`
    position: absolute;
    right: 30px;
    top: 32px;
    color: #F3F3F3;
`