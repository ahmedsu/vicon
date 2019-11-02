import Axios from 'axios';

let emulgatorBaseLink='';

const EmulgatorAPI={
  /*GetEmulgatorByCode:(emulgatorCode)=>{
    Axios.get(`http://192.168.137.222:1337/Emulgators?ecode_eq=${emulgatorCode}`)
    .then(res=>{
      console.log(res);
      return res;
    })
    .catch(err=>{
      console.log(err);
      return err;
    })

  }*/
    GetEmulgatorByCode : (emulgatorCode) => {
        return Axios.get('https://vx-e-additives.p.rapidapi.com/additives/'+emulgatorCode,{
            "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"vx-e-additives.p.rapidapi.com",
                "x-rapidapi-key":"1a7cc1f172msh5998fed80f32afap1863adjsn44b5bf46eda1"
                },"params":{
                    "locale":"en"
                    }
                    })
                    .then((response)=>{
                      return response;
                    })
                    .catch((error)=>{
                      return error;
                    })  
        }

}
export default EmulgatorAPI;