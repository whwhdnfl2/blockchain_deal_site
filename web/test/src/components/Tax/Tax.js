import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { useState } from "react";
import ErrorTaxPage from "./ErrorTaxPage";

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

const Tax = (props) => {
  const [taxIsValid, setTaxIsValid] = useState(false);
  const [insertTax, setInsertTax] = useState(0);


  const submitHandler = (event) => {
    event.preventDefault();
    if(0 < insertTax < 100){
      setTaxIsValid(true);
      return;
    }
    props.onTax(insertTax);
    props.handleTaxClose();
  };

  const taxChangeHandler = (event) => {
    setInsertTax(event.target.value);
    postTaxData();
  }

  async function postTaxData(){
    const SellData = {
      id: props.myID,
      tax: insertTax,
    }
    const response = await fetch(`/api/`, {
      method: 'POST',
      body: JSON.stringify(SellData)
    });
    props.onTax(insertTax)
    const data = await response.json();
    console.log(JSON.stringify(data));
    console.log("postsell");
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onTaxClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={submitHandler}>
              <div>
                <label htmlFor="rec">Tax</label>
                <input type="number" id="rec" value={props.tax} onChange={taxChangeHandler}></input>
              </div>
              <Button type="submit" variant="contained">
                submit
              </Button>
            </form>
          </Typography>
        </Box>  
      </Modal>
      {taxIsValid && <ErrorTaxPage open={taxIsValid} onValid={setTaxIsValid}></ErrorTaxPage>}
    </div>
  );
};

export default Tax;
