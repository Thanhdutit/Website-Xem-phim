import axios from 'axios';
async function authorization() {
    let token = localStorage.getItem('token')
    if(token)
    {
        let headers = {
            Authorization: `Bearer ${token}`
        }
        try {
            let data = await axios('http://localhost:1001/authorization', {
                method: 'GET',
                headers: headers
            })
            return data.data
        } catch (error) {
            return undefined
        }
    }
    else return undefined
}
export default authorization