import SigninForm from "../common/form/SigninForm"
import { Link, useNavigate } from "react-router-dom"
import UserContext from '../contexts/UserContext';

export default function Signin() {
    const navigate = useNavigate()
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    return (
        <>
            <SigninForm 
                setUsername={setUsername}
                setPassword={setPassword}
            />
            <Link to='/signup'>First time? Create an account!</Link>
        </>
        
    )
}