const UserAPI={
    Register:(name,email,password)=>{
        return fetch('http://192.168.137.222:1337/auth/local/register', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'username': name,
            'email':email,
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
    },
    Login:(email,password)=>{
        return fetch('http://192.168.137.222:1337/auth/local/register', {
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