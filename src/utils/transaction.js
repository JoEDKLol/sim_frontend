import axios from 'axios';

const axiosAuth = axios.create({
    baseURL : process.env.REACT_APP_BACKURL
})

axiosAuth.interceptors.request.use((config)=>{
    let obj = getToken();
    let accessToken = obj.accesstoken;
    let refreshtoken = obj.refreshtoken;
    config.headers["authorization"] = accessToken;
    config.headers["refreshtoken"] = refreshtoken;
    return config;
    
})

// axiosAuth.interceptors.response.use((config)=>{
//     let obj = getToken();
//     let accessToken = obj.accesstoken;
//     let refreshtoken = obj.refreshtoken;
//     config.headers["authorization"] = accessToken;
//     config.headers["refreshtoken"] = refreshtoken;
//     return config;
    
// })

const storeToken = (obj) => {
    let retYn = false;
    sessionStorage.setItem('accesstoken', obj.accesstoken);
    localStorage.setItem('refreshtoken', obj.refreshtoken);
    return retYn;
}

const getToken = () => {
    let obj = {"accesstoken":sessionStorage.getItem('accesstoken'),"refreshtoken":localStorage.getItem('refreshtoken')}
    return obj;
}

const clearToken = (obj) => {
    let retYn = false;
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
    return retYn;
}

const transactionAdd = async (type, url, obj, callback) => {
    try{
        let resp, data;

        if(type == "get"){
            resp = await axiosAuth.get(process.env.REACT_APP_BACKURL + "auth/" + url ,obj);
            data = await resp.data;
        }else if(type == "post"){
            resp = await axiosAuth.post(process.env.REACT_APP_BACKURL + "auth/" + url ,obj);
            data = await resp.data;
        }

        let tokenObj = {}
        tokenObj.accesstoken = resp.headers.accesstoken;
        tokenObj.refreshtoken = resp.headers.refreshtoken;

        if(data.message === "newToken"){
            storeToken(tokenObj);    
            if(type == "get"){
                resp = await axiosAuth.get(process.env.REACT_APP_BACKURL + "auth/" + url ,obj);
                data = await resp.data;
            }else if(type == "post"){
                resp = await axiosAuth.post(process.env.REACT_APP_BACKURL + "auth/" + url ,obj);
                data = await resp.data;
            }
            
        }
        // console.log(data);
        callback(data);
    }
    catch(error){
        // console.log("error");
        if(error){
            callback("", error.response.data);
        }
    }
}

 
export {axiosAuth, storeToken, clearToken, transactionAdd};