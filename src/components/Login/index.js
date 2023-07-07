import { useState } from "react"
import { auth } from '../../config/firebase'
import { Link , useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import './Login.css'

function Login(){
    const navigate = useNavigate()
    const [accData , setAccData] = useState({
        email: "",
        password: ""
    });
    const [errMsg, setErrMsg] = useState("");
    const [submitBtn, setSubmitBtn] = useState(false);

    const submitt =()=>{
        console.log("accData-->", accData)
        if(!accData.email || !accData.password){
            setErrMsg("FILL ALL FIELDS OF INPUT")
        }
        setErrMsg("");
        setSubmitBtn(true);

        signInWithEmailAndPassword(auth , accData.email, accData.password)
        .then(
            async (res)=>{
             setSubmitBtn(false);
          
          navigate("/dashboard");
         })
        .catch(
            (error)=>{
                setSubmitBtn(false);
                setErrMsg(error.message);
                console.log(error)
        // const errorCode = error.code;
        // const errorMessage = error.message;
        })
    }

    return <>
        <div className="main-container">
            <div className="body">
                <div className="formSection"> 
                <input type="email" placeholder="Enter your Email" onChange={event=>
                        setAccData((prev) => ({...prev, email: event.target.value}))
                        }/>
                     <input type="password" placeholder="Enter your Password" onChange={event=>
                        setAccData((prev) => ({...prev, password: event.target.value}))
                        }/>
                        <div className="errorMsg"> {errMsg}</div>
                     <button
                     className="button"
                     onClick={submitt}
                     disabled={submitBtn}
                     >Login</button>
                    </div>


                     <p className="form-footer">Don't have an account <span className="link"><Link to='/'>Signup</Link></span> </p>
            </div>
        </div>

    
    </>

}
export default Login