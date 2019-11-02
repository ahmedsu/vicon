import Axios from 'axios';

const BankaAPI={
    GetCurrencies:()=>{
        Axios.get("https://www.cbbh.ba/CurrencyExchange/GetJson?date=11%2F02%2F2019%2000%3A00%3A00")
        .then(res=>{
            console.log(res);
            return res;
        })
        .catch(err=>{
            console.log(err);
            return err;
        });
    }
}
export default BankaAPI;