import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper, Table, TableRow, TableCell, TableBody, TableHead, Button, TableContainer,Modal,TextField  } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import "./index.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Communications() {
const [loading, setLoading] = useState(true);
const [communications, setCommunications] = useState();
const [open, setOpen] = useState(false);
const [successMessage, setSuccessMessage] = useState(false);
const [formData, setFormdata] = useState({from:'',to:'',subject:'',message:''});

const history = useHistory();

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: "30%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none"
  }
}));

const handleOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};
const classes = useStyles();


const getCommunications = () => {
  setLoading(true);

  axios.get("/Communications")
  .then(function (response) {
    console.log(response);
    setCommunications(response.data);
    setLoading(false);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}


  useEffect(() => {
    getCommunications();
  }, []);

  if(loading){
    return <div>Loading...</div>
  }
  function CreateCommunication()
  {
    console.log(formData);
    setLoading(true);

    axios.post("/Communications",formData)
    .then(function (response) {
      console.log(response);
      setLoading(false);
      setSuccessMessage(true);
      setOpen(false);
      setTimeout(
        function() {
          setSuccessMessage(false);
          window.location.reload();
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
  function showDetails(rowData)
  {
  history.push("/"+rowData.id);
  }

  //TODO: Make individual rows clickable so you can drill down into the details
  return (
    <React.Fragment>
      
<div className="container">
  <div className="createBtn">
  <Button onClick={() => {
              handleOpen();
            }} variant="contained" color="primary">
     <i class="bi bi-plus-circle"></i> &nbsp; Create
    </Button>
  </div>
<h1> Communicator Solution</h1>
<div className="createModal">
<Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
    >
      <div className="createModal">

     <strong><i onClick={() => {
              handleClose();
            }} className="bi bi-x-lg"></i> </strong> 
      <form class="container">
      <h3>Create Communication</h3>
  <div class="row">
    <div class="col-75">      
    <TextField
    required
    style ={{width: '100%'}}
        id="from"
        label="From"
        variant="outlined"
        onChange={(e) => {
          setFormdata({...formData,from:e.target.value});
        }}
      />
    </div>
  </div>
  <div class="row">
    <div class="col-75">
    <TextField
    required
    style ={{width: '100%'}}
        id="from"
        label="To"
        variant="outlined"
        onChange={(e) => {
          setFormdata({...formData,to:e.target.value});
        }}
      />
    </div>
  </div>
  <div class="row">
    <div class="col-75">

    <TextField
    required
    style ={{width: '100%'}}
        id="from"
        label="Subject"
        variant="outlined"
        onChange={(e) => {
          setFormdata({...formData,subject:e.target.value});
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
        onChange={(e) => {
          setFormdata({...formData,message:e.target.value});
        }}
      />
    </div>
  </div>
<br/>
<hr/>
  <div class="row">
      <Button variant="contained" color="primary" onClick={CreateCommunication}>
        Create
      </Button>
  </div>
  </form>
      </div>
    </Modal>
</div>
    
{successMessage && <Alert severity="success">Created Successfully</Alert>}
      <TableContainer  component={Paper}>
      <Table className ="table" sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className ="tableHeader" > 
          <TableCell><b>Id</b></TableCell>
            <TableCell><b>From</b></TableCell>
            <TableCell ><b>To</b></TableCell>
            <TableCell ><b>Subject</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {communications?.map((row) => (
            <TableRow className ="tableCell"
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={()=>showDetails(row)}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.from}
              </TableCell>
              <TableCell >{row.to}</TableCell>
              <TableCell>{row.subject}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</div>

      </React.Fragment>
  );
}