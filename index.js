import axios from 'axios';
import { useEffect, useState } from 'react';


function App(){

const [customerData, setCustomerData] = useState([]);
const baseUrl = 'https://ktwjky3ybe.execute-api.us-east-1.amazonaws.com';

async function getAllUsers() {
  var arr = [];
  await axios.get(baseUrl+'/customers')
      .then(async response => { 
          var data = response.data.customerIds.map( async id => getUser(id));
          arr = await Promise.all(data);
      })
      .catch(error => console.log(error))
      setCustomerData(arr);
  return arr; 
}

async function getUser(id) {
  let user = await axios.all(
      [
          axios.get(baseUrl+'/customers/'+ id)
      ]).then(axios.spread((res) => {
          return  res.data;
      })).catch(error => { console.log(error) })
  return user 
}
 
useEffect(()=>{

  getAllUsers();

}, [setCustomerData]);
  
  return (
    <>
    <ul>
      {
        customerData.map((data)=>(
          <li key={data.id}>{data.id} - {data.first_name} {data.last_name}</li>
        ))
      }
    </ul>
    </>
  );
}

export default App;
