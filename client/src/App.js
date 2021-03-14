import React, {useState, useEffect} from "react";
import './App.css';
import Axios from "axios";

function App() {
  const [regemail, setregEmail] = useState('');
  const [regpassword, setregPassword] = useState('');
  const [regclinicName, setregClinicName] = useState('');
  const [regphoneNumber, setregPhoneNumber] = useState('');
  const [regaddress, setregAddress] = useState('');
  const [userLoginEmail, setUserLoginEmail] = useState('');
  const [userLoginPassword, setUserLoginPassword] = useState('');

  const [doctor_name, setNewDoctorName] = useState('');
  const [patient_name, setNewPatientName] = useState('');
  const [diagnosis, setNewDiagnosis] = useState('');
  const [medication, setNewMedication] = useState('');
  const [consultation_fee, setNewConsultationFee] = useState('');
  const [date_time, setNewDateTime] = useState('');
  const [follow_up, setNewFollowUp] = useState('');

  const [userList, setUserList] = useState([]);
  const [recordList, setRecordList] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState();
  // const [registerPage, setRegisterPage] = useState();
  // const [loginPage, setLoginPage] = useState();
  const [pageState, setPageState] = useState('');

  const getUser = ()=>{
    Axios.get('http://localhost:4469/api/get').then(
    (response)=>{
      setUserList(response.data);
    })
  }

  const getRecord = () =>{
    Axios.get("http://localhost:4469/api/record").then((response)=>{
      if(response.data.length > 0){
        // console.log(response);
        setRecordList(response.data);
      }
      else{
      }
    });
  }

  useEffect(()=>{
    setIsLoggedIn(null);
    setPageState("login");
    Axios.get("http://localhost:4469/api/login").then((response)=>{
      if(response.data.loggedIn === true){
        setUserList(response.data.user);
        console.log(response);
        setPageState("login-browse-record");
        setIsLoggedIn(true);
      }
      else{
        console.log(response);
        setIsLoggedIn(false);
        getUser();
      }
    });
    
    
  }, []);
  
  Axios.defaults.withCredentials = true;


  const registerButtonClicked = () => {
    Axios.post('http://localhost:4469/api/register',{
      email: regemail,
      password: regpassword,
      clinicName: regclinicName,
      phoneNumber: regphoneNumber,
      address: regaddress
    }).then( () => {
      alert("sucessful inserted");
      clearField("registerFormInput");
      setPageState("login");
      getUser();
    });
  };

  const loginButtonClicked = () => {
    Axios.post('http://localhost:4469/api/login',{
      email: userLoginEmail,
      password: userLoginPassword
    }).then( (response) => {
      if(response.data.message !== "" && response.data.length > 0){
        alert("sucessful login");
        setUserList(response.data);
        setPageState("login-browse-record");
        setIsLoggedIn(true);
        
      }
      else{
        alert(response.data.message);
      }
    });
  };

  const logoutButtonClicked = () => {
    Axios.post('http://localhost:4469/api/logout',{
      // email: userLoginEmail,
      // password: userLoginPassword
    }).then( (response) => {
      if(response.data.loggedIn === false){
        setPageState("login");
        setIsLoggedIn(false);
        clearField("registerFormInput");
        getUser();
      }
      // if(response.data.message !== "" && response.data.length > 0){
      //   alert("sucessful login");
      //   setUserList(response.data);
      //   setIsLoggedIn(true);
      // }
      // else{
      //   alert(response.data.message);
      // }
    });
  }

  const createRecordSumbitButtonClicked = () => {
    Axios.post('http://localhost:4469/api/createNewConsultationRecord',{
      doctor_name: doctor_name,
      patient_name: patient_name,
      diagnosis: diagnosis,
      medication: medication,
      consultation_fee: consultation_fee,
      date_time: date_time,
      follow_up: follow_up
    }).then( () => {
      alert("sucessful inserted a consultation record");
      clearField('consultationRecordInput');
      getRecord();
      setPageState("login-browse-record");
    });
  }

  const clearField = (mode) => {
    if(mode === "registerFormInput"){
      let formInputs = document.querySelectorAll(".form input[type='text']");
      formInputs.forEach((item, index)=>{
        item.value = "";
      });
      setregEmail('');
      setregClinicName('');
      setregPassword('');
      setregPhoneNumber('');
      setregAddress('');
      setUserLoginEmail('');
      setUserLoginPassword('');
    }
    else if(mode === "consultationRecordInput"){
      setNewDoctorName('');
      setNewPatientName('');
      setNewDiagnosis('');
      setNewMedication('');
      setNewConsultationFee('');
      setNewDateTime('');
      setNewFollowUp('');
    }
    
    

    
  }

  if(isLoggedIn === false){
    if(pageState === "register"){
      return <div className="App">
      <div className="form registration-form">
      <h1>Clinic Registration</h1>
        <div className="fieldName">Email: </div>
        <input type="text" name="email" onChange={(e)=>{
          setregEmail(e.target.value)
        }}></input>
        <div className="fieldName">Password: </div>
        <input type="text" name="password" onChange={(e)=>{
          setregPassword(e.target.value)
        }}></input>
        <div className="fieldName">Clinic Name: </div>
        <input type="text" name="clinicName" onChange={(e)=>{
          setregClinicName(e.target.value)
        }}></input>
        <div className="fieldName">Phone number: </div>
        <input type="text" name="phoneNumber" onChange={(e)=>{
          setregPhoneNumber(e.target.value)
        }}></input>
        <div className="fieldName">Address: </div>
        <input type="text" name="address" onChange={(e)=>{
          setregAddress(e.target.value)
        }}></input>
        <button onClick={registerButtonClicked}>Register</button>
        </div>
        <div className="go-login">Already have an account?</div>
        <button className="go-login" onClick={()=>{
          setPageState("login")
          clearField("registerFormInput");
        }}>Go login</button>
      </div>
      }
      if(pageState === "login"){
       
        
        return<div className="App"><div className="form login-form">
        <h1>Clinic User Log In</h1>
          <input type="text" name="userLoginEmail" onChange={(e)=>{
            setUserLoginEmail(e.target.value)
          }} placeholder="Email..."></input>
          <input type="text" name="userLoginPassword" onChange={(e)=>{
            setUserLoginPassword(e.target.value)
          }} placeholder="Password..."></input>
          <button onClick={loginButtonClicked}>Login</button>
          </div>
          <div className="go-register">Don't have account yet?</div>
          <button className="go-register" onClick={()=>{
            setPageState("register")
            clearField("registerFormInput");
          }}>Go register</button>
        </div>
      }
      else{
        return <h1>Error before login</h1>
      }
      

      
      
      {/*<div className="grid-container">
        <div className="grid-item">Email</div><div className="grid-item">Clinic Name</div><div className="grid-item">Phone Number</div><div className="grid-item">Address</div>
        {userList.map((row)=>{
          return Object.keys(row).map((element)=>{
            return <div className="grid-item">{row[element]}</div>
          })
        })}
      </div>
      </div>*/}
  }
  else if(isLoggedIn===true){
    getRecord();
    if(pageState === "login-browse-record"){
      return <div className="infoPage">
        <h1>Welcome - {userList[0].clinicName}</h1>
        <button onClick={logoutButtonClicked} className="logout">Logout</button>
        <div className="consultation-record-container">
            <div className="consultation-record-item title">Doctor Name</div>
            <div className="consultation-record-item title">Patient Name</div>
            <div className="consultation-record-item title">Diagnosis</div>
            <div className="consultation-record-item title">Medication</div>
            <div className="consultation-record-item title">Fee</div>
            <div className="consultation-record-item title">Date Time</div>
            <div className="consultation-record-item title">Follow Up?</div>
            {recordList.map((row)=>{
              return Object.keys(row).map((element)=>{
                return <div className="consultation-record-item">{row[element]}</div>
              })
            })}
        </div>
        
        <button onClick={()=>{
            setPageState("login-create-record")
          }
        } className="createRecord">Create Record</button>
      </div>
    }
    else if(pageState === "login-create-record"){
      
      return <div className="form create-record-form">
        <h1>Clinc Name - {userList[0].clinicName}</h1>
        <button onClick={logoutButtonClicked} className="logout">Logout</button>
        <div className="fieldName">Doctor Name: </div>
        <input type="text" name="doctor_name" onChange={(e)=>{
          setNewDoctorName(e.target.value)
        }}></input>
        <div className="fieldName">Paitent Name: </div>
        <input type="text" name="patient_name" onChange={(e)=>{
          setNewPatientName(e.target.value)
        }}></input>
        <div className="fieldName">Diagnosis: </div>
        <input type="text" name="diagnosis" onChange={(e)=>{
          setNewDiagnosis(e.target.value)
        }}></input>
        <div className="fieldName">Medication: </div>
        <input type="text" name="medication" onChange={(e)=>{
          setNewMedication(e.target.value)
        }}></input>
        <div className="fieldName">Consultation Fee: </div>
        <input type="text" name="consultation_fee" onChange={(e)=>{
          setNewConsultationFee(e.target.value)
        }}></input>
        <div className="fieldName">Date and Time: </div>
        <input type="text" name="date_time" onChange={(e)=>{
          setNewDateTime(e.target.value)
        }}></input>
        <div className="fieldName">Follow up consultation: </div>
        <input type="text" name="follow_up" onChange={(e)=>{
          setNewFollowUp(e.target.value)
        }}></input>
        <button onClick={()=>{
            setPageState("login-browse-record")
          }
        } class="browseRecord">Back</button>
        <button onClick={createRecordSumbitButtonClicked} className="submit">Submit</button>
        
      </div>
      
    }
    else{
      return <h1>Error after log in</h1>
    }
    
  }
  else{
    return <div>Loading ...</div>
  }
}

export default App;
