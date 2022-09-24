import * as React from 'react';

import "./good.css";
import Card from "../../UI/Card/Card"


const InnerPage = (props) => {
    return (
        <React.Fragment>
            <div class="parent">
                <Card>
                    <h2 className="good" >보유 자산</h2>
                    <h3>{props.asset}</h3>
                </Card>
                <Card>
                    <h2 className="good" >보유 REC</h2>
                    <h3>{props.rec}</h3>
                </Card>
                <Card>
                    <h2 className="good" >최근 거래한 자산 양</h2>
                    <h3>{props.rKRW}</h3>
                </Card>
                <Card>
                    <h2 className="good" >최근 거래한 REC 양</h2>
                    <h3>{props.rREC}</h3>
                </Card>
            </div>
        </React.Fragment>
      );
    }

export default InnerPage;