import robot from '../assets/robot.png';
import {useNavigate} from 'react-router-dom';
import {useState} from "react";
const LandingPage = () => {
    const year = new Date().getFullYear();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const baseURL = import.meta.env.VITE_SERVER_URL;
    console.log(baseURL);
    const login = async (e) => {
        e.preventDefault();
        const dbCommand = {
            find: "users",
            filter: { email: formData.email }
        }
        const body = {
            dbCommand,
            password: formData.password
        }
        const data = {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(body)
        }
        try {
            const response = await fetch(`${baseURL}/login`,data)
            if (response.ok) {
                let parsedResponse = await response.json();
                navigate("/dashboard", {state: parsedResponse});
            }
        } catch(e) {
            window.alert("Login failed \n"+e.status);
        }
    }
    return (
        <div className="d-flex py-4 align-items-center bg-body-tertiary min-vh-100">
        <main className="form-signin w-100 m-auto">
            <form onSubmit={(e) => login(e)}>
                <img className="mb-4" src={robot} alt="" width="72" height="57"/>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        name="email"
                        onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value} ) }
                        placeholder="name@example.com"/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value} ) }
                        id="floatingPassword"
                        placeholder="Password"/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="form-check text-start my-3">
                    <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Remember me
                    </label>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-body-secondary">&copy; {year}</p>
            </form>
        </main>
        </div>
    )
}
export default LandingPage;