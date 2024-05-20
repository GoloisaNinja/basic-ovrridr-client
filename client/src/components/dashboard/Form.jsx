import {useState, useEffect} from 'react'
import buildBasicRequest from "../../utils/buildBasicRequest.js";
const Form = ({ permissions, setResponse }) => {
    const [queryDecision, setQueryDecision] = useState("");
    const buildQuery = async () => {
        let tempDecision = "";
        const radios = document.getElementsByTagName('input')
        const canQuery = Array.from(radios).findIndex(radio => radio.checked);
        if (canQuery === -1) {
            return window.alert("Contact your admin and ask for querying capability")
        }
        if (!queryDecision) {
            setQueryDecision(Array.from(radios)[canQuery].value)
            tempDecision = Array.from(radios)[canQuery].value
        }
        const dbCommand = {
            find: queryDecision ? queryDecision : tempDecision
        }
        const body = {
            dbCommand
        }
        const data = buildBasicRequest({
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-type": "application/json",
            },
        })
        data.body = JSON.stringify(body)
        try {
            const response = await fetch("http://localhost:5000/",data)
            if (response.ok) {
                let parsedResponse = await response.json();
                setResponse(parsedResponse);
            }
        } catch(e) {
            window.alert("There was a problem! \n"+e.status);
        }
    }
    return (
            <div className="list-group list-group-checkable d-grid gap-2 border-0 px-0">
                {permissions.viewUsers && (
                    <>
                        <input className="list-group-item-check pe-none"
                               type="radio" name="listGroupCheckableRadios"
                               id="listGroupCheckableRadios1"
                               value="users"
                               onChange={(e) => {setQueryDecision(e.target.value)}}
                               defaultChecked={permissions.viewUsers}
                               disabled={!permissions.viewUsers}
                        />
                        <label className="list-group-item rounded-3 py-3" htmlFor="listGroupCheckableRadios1">
                        Users
                        <span className="d-block small opacity-50">Query Overridr Users</span>
                        </label>
                    </>
                )}
                    <input className="list-group-item-check pe-none"
                           type="radio" name="listGroupCheckableRadios"
                           id="listGroupCheckableRadios2"
                           value="products"
                           onChange={(e) => {setQueryDecision(e.target.value)}}
                           defaultChecked={!permissions.viewUsers && permissions.viewProducts}
                           disabled={!permissions.viewProducts}
                    />
                    <label className="list-group-item rounded-3 py-3" htmlFor="listGroupCheckableRadios2">
                            Products
                            <span className="d-block small opacity-50">Query Overridr Products</span>
                    </label>

                    <input className="list-group-item-check pe-none"
                               type="radio"
                               name="listGroupCheckableRadios"
                               id="listGroupCheckableRadios3"
                               value="permissions"
                               onChange={(e) => {setQueryDecision(e.target.value)}}
                               defaultChecked={!permissions.viewUsers && !permissions.viewProducts && permissions.viewPermissions}
                               disabled={!permissions.viewPermissions}
                        />
                            <label className="list-group-item rounded-3 py-3" htmlFor="listGroupCheckableRadios3">
                                Permissions
                                <span className="d-block small opacity-50">Query Overridr Permissions by User</span>
                            </label>
                    <button className="btn btn-warning w-100 py-2 my-3"
                        onClick={() => buildQuery()}
                    >Submit</button>
            </div>
    );
}
export default Form;