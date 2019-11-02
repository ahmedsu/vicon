import Axios from 'axios';

let emulgatorBaseLink='';

const EmulgatorAPI={
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