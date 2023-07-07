import { getAllUsersData, getUserData } from '../../config/firebase';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, logout } from '../../config/firebase';
import './style.css'



function CreateChat() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  const [user, setUser] = useState()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid)
        console.log("user...", user)
      } else {
      }
    });
  }, []);
  const navigate = useNavigate()

  const [ContactData, setContactData] = useState([]);
  const getContactData = async () => {
    const res = await getUserData();
    setContactData(res.data);

  }
  useEffect(() => {
    getContactData()
  }, [])
  const filterContact = ContactData.filter(item => {
    if (item.uid == user) {
      return item
    }
  }); console.log(filterContact)


  console.log(ContactData)

  const getData = async () => {
    const res = await getAllUsersData();
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);
  const chatStart = () => {

    navigate('/msgs:id')
  }

  return <>
  <div className='mainContainer'>
    <div className='scndDiv'>
    <h1>chats</h1>
    {filterContact.map((item, index) => {
      return <div className='profileUserActive' key={index}>
        
        <img className='imageUser' src={item.url} />
        <h3 > {item.name}</h3>
        
      <button className='dbbutton'
       onClick={async () => {
        await logout()
        navigate("/login")
      }}>Logout</button>
      </div>
    })}
      <input
      className='Search'
        onChange={(e) => setSearch(e.target.value)}
        type='text' placeholder='Search...' />
      <div className='Adss'>
        {
          data.filter((users) =>
            users.name.toLowerCase().includes(search)).map((users, index) => {
              return <>
                <div className='showUsers'>
                  <div className='chats'key={index}
                    onClick={()=>navigate(`/msgs/${users.uid}`)}
                  >
                   <img className='usersImg' src={users.url}/>
                   <h4 className='usersName'> {users.name}</h4>
                  </div>
                </div>
              </>
            })
        }
      </div>
    </div>
  
  </div>
    

  </>
}
export default CreateChat;