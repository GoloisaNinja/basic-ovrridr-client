export default function buildBasicRequest(reqObj) {
    let request = {};
    for (const [key, value] of Object.entries(reqObj)) {
        request[key] = value;
    }
    return request;
}
