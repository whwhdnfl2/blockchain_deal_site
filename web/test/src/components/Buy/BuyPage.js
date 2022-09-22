import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useState } from "react";
import ErrorBuyPage from "./ErrorBuyPage";
import Card from "../../UI/Card/Card"

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

const BuyPage = (props) => {
  const [isValid, setIsValid] = useState(false);
  const [insertRec, setInsertRec] = useState(0);

  const recChangeHandler = (event) =>{
    setInsertRec(event.target.value);
  }

  const submitHandler = (event) =>{
    event.preventDefault();
    if(props.myAsset < props.buyRec*insertRec){
        setIsValid(true);
        return;
    }
    else{
      putBuyData();
      props.handleClose();
    }
  }

  async function putBuyData() {
    const SellData = {
      buyerID: props.myID, //구매자 id
      sellerID: props.buyID,// 판매자 id
      rec: insertRec, //입력한 rec 갯수
      asset: props.buyRec, //rec 개당 가격
    }
    const response = await fetch('http://local:8080/api/', {
      method: 'POST',
      body: JSON.stringify(SellData)
    });

    props.onMyRec(Number(props.myRec) + Number(insertRec));
    props.onMyAsset(props.myAsset - props.buyRec*insertRec);
    const data = await response.json();
    console.log(JSON.stringify(data));
    console.log("postsell");
    props.onShow();
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Card>
              <p>rec 개당 가격: {props.buyRec}</p>
              <p>rec 갯수: {props.buyNum}</p>
              <p>판매자: {props.buyID}</p>
            </Card>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={submitHandler}>
              <div>
                <label htmlFor="rec">구매할 rec 갯수: </label>
                <input type="number" id="rec" onChange={recChangeHandler}></input>
              </div>
              <p>총 가격: {props.buyRec * insertRec}</p>
              <Button type="submit" variant="contained">
                submit
              </Button>
            </form>
          </Typography>
        </Box>  
      </Modal>
      <ErrorBuyPage open={isValid} onValid={setIsValid}></ErrorBuyPage>
    </div>
  );
};

export default BuyPage;
