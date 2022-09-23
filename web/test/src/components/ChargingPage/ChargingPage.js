import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useState } from "react";
import {TextField} from "@mui/material";
import ErrorChargingPage from "./ErrorChargingPage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ChargingPage = (props) => {
  const [insertREC, setInsertTax] = useState(0);
  const [insertKRW, setInsertKRW] = useState(0);

  const [chargingIsValid, setChargingIsValid] = useState(false);


  const submitHandler = (event) => {
    event.preventDefault();
    if(Number(props.rec) + Number(insertREC) < 0 || Number(props.asset) + Number(insertKRW) < 0){
      setChargingIsValid(true);
      return;
    }
    postChargingData();
    props.onRec(Number(props.rec) + Number(insertREC));
    props.onAsset(Number(props.asset) + Number(insertKRW));
    props.onChargingClose();
  };

  const REChangeHandler = (event) => {
    setInsertTax(event.target.value);
  }

  const KRWchangeHandler = (event) => {
    setInsertKRW(event.target.value);

  }

  async function postChargingData(){
    const SellData = {
      id: props.myID,
      rec: insertREC,
      krw: insertKRW,
    }
    try{
      const response = await fetch(`/api/`, {
        method: 'POST',
        body: JSON.stringify(SellData)
      });

      if(!response.ok){
        throw new Error('Charging fail');
      }

      props.onREC(props.rec + insertREC);
      props.onAsset(props.asset + insertKRW);
      const data = await response.json();
      console.log(JSON.stringify(data));
      console.log("postsell");
    }catch(error){
      console.log(error.message);
    }
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onChargingClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={submitHandler}>
              <h2>충전하거나 빼가고싶은 rec와 자산의 양을 입력하세요. (정수)</h2>
              <TextField margin="dense" label="REC" onChange={REChangeHandler} inputProps={{type:"number"}} />
              <TextField margin="dense" label="KRW" onChange={KRWchangeHandler} inputProps={{type:"number"}} />
              <div/>
              <Button type="submit" variant="contained">
                submit
              </Button>
            </form>
          </Typography>
        </Box>  
      </Modal>
      {chargingIsValid && <ErrorChargingPage open={chargingIsValid} onValid={setChargingIsValid}></ErrorChargingPage>}
    </div>
  );
};

export default ChargingPage;
