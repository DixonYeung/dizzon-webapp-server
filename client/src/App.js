import React, {useState, useEffect} from "react";
import './App.css';
import Axios from "axios";

function App() {

  //new code
  const [regInputFieldValue, setRegInputFieldValue] = useState({
    email: '', 
    password: '',
    clinicName: '',
    phoneNumber: '',
    address: ''
  });

  const [loginFieldValue, setLoginFieldValue] = useState({
    userLoginEmail: '',
    userLoginPassword: ''
  });

  const [newConsultationRecord, setNewConsultationRecord] = useState({
    doctor_name: '', 
    patient_name: '',
    diagnosis: '',
    medication: '',
    consultation_fee: '',
    date_time: '',
    follow_up: ''
  });

  const [userList, setUserList] = useState([]);
  const [recordList, setRecordList] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState();
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
      email: regInputFieldValue['email'],
      password: regInputFieldValue['password'],
      clinicName: regInputFieldValue['clinicName'],
      phoneNumber: regInputFieldValue['phoneNumber'],
      address: regInputFieldValue['address']
    }).then( () => {
      alert("sucessful inserted");
      clearField("registerFormInput");
      setPageState("login");
      getUser();
    });
  };

  const loginButtonClicked = () => {
    Axios.post('http://localhost:4469/api/login',{
      email: loginFieldValue['userLoginEmail'],
      password: loginFieldValue['userLoginPassword']
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
    }).then( (response) => {
      if(response.data.loggedIn === false){
        setPageState("login");
        setIsLoggedIn(false);
        clearField("registerFormInput");
        getUser();
      }
    });
  }

  const createRecordSumbitButtonClicked = () => {
    Axios.post('http://localhost:4469/api/createNewConsultationRecord',{
      doctor_name: newConsultationRecord['doctor_name'],
      patient_name: newConsultationRecord['patient_name'],
      diagnosis: newConsultationRecord['diagnosis'],
      medication: newConsultationRecord['medication'],
      consultation_fee: newConsultationRecord['consultation_fee'],
      date_time: newConsultationRecord['date_time'],
      follow_up: newConsultationRecord['follow_up']
    }).then( () => {
      alert("sucessful inserted a consultation record");
      clearField('consultationRecordInput');
      getRecord();
      setPageState("login-browse-record");
    });
  }

  const clearField = (mode) => {
    if(mode === 'registerFormInput'){
      setRegInputFieldValue({ email: '', password: '', clinicName: '', phoneNumber: '', address: ''});
      setLoginFieldValue({userLoginEmail: '', userLoginPassword: ''})
    }
    else if(mode === 'consultationRecordInput'){
      setNewConsultationRecord({ doctor_name: '',  patient_name: '', diagnosis: '', medication: '', consultation_fee: '', date_time: '', follow_up: ''});
    }
  }

  const handleOnChange = (e, mode)=>{
    var temp = {};
    if(mode==='register'){
      for(var key in regInputFieldValue){
        if(key == e.target.name){ temp[key] = e.target.value; }
        else{ temp[key] = regInputFieldValue[key]; }
      }
      setRegInputFieldValue(temp);
    }
    else if(mode==="login"){
      for(var key in loginFieldValue){
        if(key == e.target.name){ temp[key] = e.target.value; }
        else{ temp[key] = loginFieldValue[key]; }
      }
      setLoginFieldValue(temp);
    }
    else if(mode==="newConsultationRecord"){
      for(var key in newConsultationRecord){
        if(key == e.target.name){ temp[key] = e.target.value; }
        else{ temp[key] = newConsultationRecord[key]; }
      }
      setNewConsultationRecord(temp);
    
    }
  }


  if(isLoggedIn === false){
    if(pageState === "register"){
      return <div className="App">
        <div className="form registration-form">
          <h1>Clinic Registration</h1>
          {Object.keys(regInputFieldValue).map((key)=>{
            return [<div className="fieldName">{key}</div>,<input type="text" name={key} onChange={(e)=>{handleOnChange(e, 'register')}} value={regInputFieldValue[key]}></input>]
          })}
          <button onClick={registerButtonClicked}>Register</button>
        </div>
        <div className="go-login">Already have an account?</div>
        <button className="go-login" onClick={()=>{
          setPageState("login")
          clearField();
        }}>Go login</button>
      </div>
    }
    else if(pageState === "login"){
      return<div className="App"><div className="form login-form">
      <h1>Clinic User Log In</h1>
      {Object.keys(loginFieldValue).map((key)=>{
            return <input type="text" name={key} onChange={(e)=>{handleOnChange(e, 'login')}} placeholder={key.replace('userLogin','')+"..."} value={loginFieldValue[key]}></input>
      })}
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
            {Object.keys(newConsultationRecord).map((key)=>{
                return <div type="text" className="consultation-record-item title">{key.replace('_',' ')}</div>
            })}
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
        
        {Object.keys(newConsultationRecord).map((key)=>{
            return [<div className="fieldName">{key.replace("_"," ")}</div>,<input type="text" name={key} onChange={(e)=>{handleOnChange(e, 'newConsultationRecord')}} value={newConsultationRecord[key]}></input>]
        })}

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
