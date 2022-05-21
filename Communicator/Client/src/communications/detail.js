import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField  } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./index.scss";
import moment from 'moment';
import Alert from '@material-ui/lab/Alert';

export default function CommunicationDetail(props) {
  const [communication, setCommunication] = useState({});
  
  const [dateFormat, setDateFormat] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const history = useHistory();
   useEffect(() => {
    // TODO: fetch communication detail data
    getCommunication(props.match.params.id);
  }, []);

const getCommunication = (id) => {
  axios.get("/Communications/"+id)
  .then(function (response) {
    // handle success
    console.log(response.data);
    setCommunication(response.data);
    getDateFormat(response.data.dateSent);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

function getDateFormat(date)
{
  var time = moment(date, 'DD-MM-YYYY').format('hh:mm A');
  var month = moment(date, 'DD-MM-YYYY').format('MMMM');
  var day = moment(date, 'DD-MM-YYYY').format('DD');
  var format = month +' '+day +' '+time;
  setDateFormat(format);
}
const DeleteCommunication = () => {
  axios.delete("/Communications/"+props.match.params.id)
  .then(function (response) {
    if(response)
    setSuccessMessage(true);
    setTimeout(
      function() {
        setSuccessMessage(false);
        history.push("/");
      }
      .bind(this),
      2000
  );
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}
const UpdateCommunication = () => {
  axios.put("/Communications",communication)
  .then(function (response) {
    if(response)
    setSuccessMessage(true);
    setTimeout(
      function() {
        setSuccessMessage(false);
        history.push("/");
      }
      .bind(this),
      2000
  );

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}
function ReturnToList()
{
  history.push("/");
}

  
    // TODO: Show From, To, Subject, and Message fields. Allow for Create, Update, and Delete
  return (
    <React.Fragment>

<form class="MessageBox">
  <div class="InnerBox">
  <u onClick={ReturnToList}>	
  <i className="bi bi-caret-left-fill"></i>Back
      </u>
    <h3> Communication Details</h3>
    {successMessage && <Alert severity="success">Modified Successfully</Alert>}
    <br/>
  <div class="row">
    <div className="col-75">      
    <TextField
     style ={{width: '100%'}}
        id="from"
        label="From"
         required
        variant="outlined"
        value={communication.from || ''}
        onChange={(e) => {
          setCommunication({...communication,from:e.target.value});
        }}
      />
    </div>
  </div>
  <div class="row">
    <div class="col-75">
    <TextField
     style ={{width: '100%'}}
        id="from"
        required
        label="To"
        value={communication.to ||''}
        variant="outlined"
        onChange={(e) => {
          setCommunication({...communication,to:e.target.value});
        }}
      />
    </div>
  </div>
  <div class="row">
    <div class="col-75">

    <TextField
        id="from"
        label="Subject"
        variant="outlined"
        style ={{width: '100%'}}
        required
        value={communication.subject || ''}
        onChange={(e) => {
          setCommunication({...communication,subject:e.target.value});
        }}
      />
    </div>
  </div>
  <div class="row">
    <div class="col-75">
    <TextField
    style ={{width: '100%'}}
        id="from"
        required
        label="Message"
        multiline
        variant="outlined"
        rows={8}
  maxRows={4}
        value={communication?.message || ''}
        onChange={(e) => {
          setCommunication({...communication,message:e.target.value});
        }}
      />
    </div>
  </div>
  <div class="row">
    <div class="col-75">
    Sent: <i><small><b>{dateFormat}</b> </small></i> 
    </div>
  </div>
        <hr />
  <div className="ActionsSection">
    <div className="actionBtns">
    <Button variant="outlined" color="secondary" onClick={DeleteCommunication}>
    <i class="bi bi-trash3"></i> &nbsp;&nbsp;Delete
      </Button>
    </div>

      <Button variant="contained" color="primary" onClick={UpdateCommunication}>
      <i class="bi bi-check-circle"></i>&nbsp;&nbsp; Update
      </Button>
      </div>

  </div>
  </form>

     
   
  </React.Fragment>
  );
}
