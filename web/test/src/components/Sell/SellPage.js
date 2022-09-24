import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useState } from "react";
import ErrorSellPage from "./ErrorSellPage";
import {TextField} from "@mui/material";

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

const SellPage = (props) => {
  const [isValid, setIsValid] = useState(false);
  const [insertRec, setInsertRec] = useState(0);
  const [insertPrice, setInsertPrice] = useState(0);


  const recChangeHandler = (event) =>{
    setInsertRec(event.target.value);
  }

  const priceChangeHandler = (event) =>{
    setInsertPrice(event.target.value);
  }
  const submitHandler = (event) => {
    event.preventDefault();
    if(props.myRec < insertRec || insertRec <= 0){
        setIsValid(true);
        return;
    }
    else{
      postSellData();
      props.onShow();
      props.handleClose();
    }
  };

  async function postSellData(){
    const SellData = {
      id: props.myID,
      rec: insertRec,
    }
    try{
      const response = await fetch(`/api/Market/upREC`, {
        method: 'POST',
        body: JSON.stringify(SellData)
      });
      if(!response.ok){
        throw new Error('market등록 실패')
      }
      const data = await response.json();
      props.onMyRec(props.myRec - insertRec);
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
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={submitHandler}>
              <h2>판매를 원하는 rec 갯수와 개당 가격을 입력해주세요. (자연수)</h2>
              <TextField margin="dense" label="rec 갯수" onChange={recChangeHandler} inputProps={{type:"number"}} />
              <TextField margin="dense" label="개당 가격" onChange={priceChangeHandler} inputProps={{type:"number"}} />
              <p>총 가격: {insertPrice * insertRec}</p>
              <Button type="submit" variant="contained">
                submit
              </Button>
            </form>
          </Typography>
        </Box>  
      </Modal>
      <ErrorSellPage open={isValid} onValid={setIsValid}></ErrorSellPage>
    </div>
  );
};

export default SellPage;
