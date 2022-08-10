
import styled from "styled-components"

export default function SigninForm() {

    return (
        <>
            <Form>
                <input type="text" placeholder="username" />
                <input type="password" placeholder="password" />
                <button>Log In</button>
            </Form>
        </>

    )
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
`