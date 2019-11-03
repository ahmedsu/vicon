import config from './config';

const UserAPI={
    Register:(name,email,password, currency)=>{
        const fetchUrl = `${config.serverIp}/auth/local/register`;
        return fetch(fetchUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'username': name,
            'email':email,
            'password':password,
            'defaultCurrency': currency
        }),
        })
        .then(res=>{
            console.log("uslo u res");
            console.log(res);
            return res.json();
        })
        .catch(err=>{
            console.log("ufati err");
            console.log(err);
        })              
    },
    Login:(email,password)=>{
        const fetchUrl = `${config.serverIp}/auth/local/`;
        console.log("URL ", fetchUrl);
        return fetch(fetchUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'identifier': email,
            'password':password,
        }),
        })
        .then(res=>{
            console.log("uslo u res");
            console.log(res);
            return res.json();
        })
        .catch(err=>{
            console.log("ufati err");
            console.log(err);
        })              
    }
}
export default UserAPI;