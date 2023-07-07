
import { useState } from "react"
import { auth } from '../../config/firebase'
import { Link , useNavigate} from 'react-router-dom'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {  collection , addDoc } from 'firebase/firestore'
import { db , storage} from '../../config/firebase'
import {  ref, uploadBytes, getDownloadURL } from "firebase/storage";

import './Signup.css'


function Signup(){
    const navigate = useNavigate()
    const [accData , setAccData] = useState({
        name: "",
        email: "",
        password: "",
        img:[]
    });
    const [errMsg, setErrMsg] = useState("");
    const [submitBtn, setSubmitBtn] = useState(false);
    console.log("accData-->", accData)


    const submitt = async () =>{
        try{
        if(!accData.name || !accData.email || !accData.password){
            setErrMsg("FILL ALL FIELDS OF INPUT")
        }
        setErrMsg("");
        setSubmitBtn(true);

        const createUserWithEmailAndPasswordRes =
         await createUserWithEmailAndPassword(
            auth , 
            accData.email, 
            accData.password
            )
            const { img }  = accData;

        const uid = createUserWithEmailAndPasswordRes.user.uid;
        console.log(uid)
        let url = "";
        if (img[0]) {
          const imageName = img[0].name;
          console.log(imageName)
          const folderName = "adImage/";
          const storageRef = ref(storage, folderName + imageName);
          console.log("storage ref-->", storageRef);

          const uploadBytesRes = await uploadBytes(storageRef, img[0]);
          console.log("upload bytes-->" , uploadBytesRes);
          url = await getDownloadURL(uploadBytesRes.ref);
          console.log("url", url);
        }

        // try {async (res)=>{
        //      setSubmitBtn(false);
        //   console.log(res)
        //   const user= res.user;
        //   await updateProfile(user,{
        //     displayName: accData.name,
        //   })
        //  }}
        // catch { (error)=>{
        //         setSubmitBtn(false);
        //         setErrMsg(error.message);
        //         console.log(error)
     
         navigate("/login");

         const res = await addDoc(collection(db, "users2"), {
            name: accData.name,
            email: accData.email,
            uid: uid,
            url
          })
          console.log(res)
        }
        catch (error){
            setSubmitBtn(false);
            return setErrMsg(error.message);
        }
    }


    return <>
        <div className="main-container">
            <div className="body">
              
                <div className="formSection">
                    <input type="text" placeholder="Enter your Name" onChange={event=>
                        setAccData((prev) => ({...prev, name: event.target.value}))
                        }/>
                        <br/>
                     <input type="email" placeholder="Enter your Email" onChange={event=>
                        setAccData((prev) => ({...prev, email: event.target.value}))
                        }/>
                        <br/>
                     <input type="password" placeholder="Enter your Password" onChange={event=>
                        setAccData((prev) => ({...prev, password: event.target.value}))
                        }/>
                        <div className="errorMsg">{errMsg}</div>
                        <p className="filesty">
                        <input className="inpfile"
                        type="file" placeholder="Image"
                         onChange={event=>
                            setAccData((prev) => ({...prev, img: event.target.files}))
                        }
                        />
                        </p>

                     <button 
                      className="button"
                     onClick={submitt}  disabled={submitBtn} 
                    
                     >Sign up</button>
                     </div>
                     <p  className="form-footer">already have an account? <span className="link"> <Link to='/login'  >Login</Link></span></p>
                
            </div>
        </div>

    
    </>

}
export default Signup