import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import './style.css'

// import { auth , firestore} from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { getAllUsersData, getAllchats, logout ,getUserData, db, auth } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

function Dashboard() {
  const navigate= useNavigate()
  const params = useParams();
  console.log("params", params);

  // const [data, setData] = useState([{}])
  // console.log('data',data)
  // const getAdsDetail = async () => {
  //   const res = await getAllchats();
  //   setData(res.data);

  // };

  // useEffect(() => {
  //   getAdsDetail();
  // }, []);
  // const filterAdDetail = data.filter((i) => {
  //   console.log("...>", i.docId)
  //   if(i.docId == params.docId){
  //     return i
  //   }
  // })
  // console.log("filteAdData", filterAdDetail)
    

  const chatApp=()=>{
    navigate("./chatss")
  }

  return (
    <div className='mainDiv'>
      {/* {filterProfile.map((i) => {
        return <div >
          <image url={i.url}/>
        <p>{i.name}</p>
        <p >{i.email}</p>
      </div>
      })} */}
          <button className='dbutton'
      onClick={chatApp}>Create Chat</button>


      <button className='dbutton'
       onClick={async () => {
        await logout()
        navigate("/login")
      }}>Logout</button>
      </div>
        
        

      
  );
}

export default Dashboard;
