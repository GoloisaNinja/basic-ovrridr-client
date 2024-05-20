import {useEffect} from "react";
import {nanoid} from 'nanoid';
const Table = ({data}) => {
    let headers = [];
    let rows = [];
    for (let key of Object.keys(data[0])) {
        headers.push(key);
    }
    const buildData = (pos,rid) => {
        let rowToAppend = document.getElementById(rid);
        for (let key of Object.values(data[pos])) {
            let newData = document.createElement("td");
            let id = nanoid(6);
            newData.id = id;
            if (typeof key === 'object') {
                key = JSON.stringify(key);
            }
            newData.innerText = key;
            newData.classList.add("fs-xsm");
            rowToAppend.appendChild(newData);
        }
    }
    const buildRow = (pos) => {
        let tableBody = document.getElementById("data-table-body");
        let newRow = document.createElement("tr");
        let id = nanoid(6);
        newRow.id = id;
        tableBody.appendChild(newRow);
        buildData(pos, id);
    }
    const emptyTable = () => {
        let tableBody = document.getElementById("data-table-body");
        while(tableBody.firstChild) {
            tableBody.removeChild(tableBody.lastChild);
        }
    }
    useEffect(() => {
        emptyTable();
        for (let i = 0; i < data.length; i++) {
            buildRow(i)
        }
    },[data])
    return (
        <div className="px-3 w-100">
            <table className="table table-dark table-hover w-75">
                <thead className="table-light">
                 <tr className="table-light">
                     {headers.map((v) => (
                         <th className="table-light fs-sm" key={nanoid(6)}>{v}</th>
                     ))}
                 </tr>
                </thead>
                <tbody id="data-table-body"></tbody>
            </table>
        </div>
    );
}
export default Table;