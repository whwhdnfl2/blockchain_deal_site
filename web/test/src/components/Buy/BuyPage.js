import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
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
    if(0 >= props.buyRec*insertRec || props.myAsset < props.buyRec*insertRec){
        setIsValid(true);
        return;
    }
    else{
      putBuyData();
      props.handleClose();
    }
  }

  async function putBuyData() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const SellData = JSON.stringify({
      "id": props.itemID,
      "buyer": props.myID,
      "krw": Number(insertRec),
      "rec": props.buyRec
    });
    
    console.log(SellData)
    const response = await fetch(`/api/Market/trade`, {
      method: 'POST',
      headers: myHeaders,
      body: SellData,
      redirect: 'follow'
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
          <h2>구매를 원하는 rec 갯수를 입력해주세요. (자연수)</h2>
            <Card>
              <p>rec 개당 가격: {props.buyRec}</p>
              <p>rec 갯수: {props.buyNum}</p>
              <p>판매자: {props.buyID}</p>
            </Card>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={submitHandler}>              
              <TextField margin="dense" label="rec 갯수" onChange={recChangeHandler} inputProps={{type:"number"}} />
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
