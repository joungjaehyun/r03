import axios from "axios"


export const postProduct = async(formdata) => {


   const header = {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }
   
    const res = await axios.post('http://localhost:8080/api/products/', formdata, header)
    
    return res.data

}