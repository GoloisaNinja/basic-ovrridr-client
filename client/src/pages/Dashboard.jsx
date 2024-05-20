import {useState} from "react";
import {useLocation} from "react-router-dom";
import programming from '../assets/programming.png';
import Form from '../components/dashboard/Form.jsx';
import Table from '../components/dashboard/Table.jsx';
const Dashboard = () => {
    const location = useLocation();
    const { permissions, user } = location.state
    const [response, setResponse] = useState([])
    return (
        <>
            <div className="container my-5">
                <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
                    <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
                        <h1 className="display-4 fw-bold lh-1 text-body-emphasis">Welcome to Overridr {user.name}!</h1>
                        <p className="lead">When something is worth doing - its worth doing badly. Overridr is fraught
                            with design flaws and opportunities for mischief.</p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                            <button type="button" className="btn btn-primary btn-lg px-4 me-md-2 fw-bold">Learn
                            </button>
                            <button type="button" className="btn btn-outline-secondary btn-lg px-4">Contact</button>
                        </div>
                    </div>
                    <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
                        <img className="rounded-lg-3" src={programming} alt="cute programming computer icon"
                             width="720"/>
                    </div>
                </div>
            </div>
            <div className="container my-5">
                <h2 className="display-6 fw-bold lh-1 text-body-emphasis">This my App. Entry please.</h2>
            </div>
            <div className="container d-flex flex-column flex-md-row px-0 gap-4 mb-5 pb-3 align-items-center justify-content-left">
                <Form permissions={permissions} setResponse={setResponse} />
            </div>
            {response.length ? (
                <>
                    <div className="container my-5">
                        <h2 className="display-6 fw-bold lh-1 text-body-emphasis">Here there be Data!</h2>
                    </div>
                    <div className="container d-flex flex-column flex-md-row px-0 gap-4 mb-5 pb-3 align-items-center justify-content-left">
                        <Table data={response} />
                    </div>
                </>
            ) : null}
        </>
    )
}
export default Dashboard;