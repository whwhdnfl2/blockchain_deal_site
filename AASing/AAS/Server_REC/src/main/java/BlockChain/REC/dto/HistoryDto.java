package BlockChain.REC.dto;

import com.google.gson.JsonObject;

public class HistoryDto {
    /*
    type HistoryQueryResult struct {
        Record    *Asset    `json:"record"`
        TxId      string    `json:"txId"`
        Timestamp time.Time `json:"timestamp"`
        IsDelete  bool      `json:"isDelete"`
    }
     */
    private AssetDto record;
    private String Txid;
    private String Timestamp;
    private boolean Isdelete;

    public AssetDto getRecord() {
        return record;
    }

    public void setRecord(AssetDto record) {
        this.record = record;
    }

    public String getTxid() {
        return Txid;
    }

    public void setTxid(String txid) {
        Txid = txid;
    }

    public String getTimestamp() {
        return Timestamp;
    }

    public void setTimestamp(String timestamp) {
        Timestamp = timestamp;
    }

    public boolean isIsdelete() {
        return Isdelete;
    }

    public void setIsdelete(boolean isdelete) {
        Isdelete = isdelete;
    }

    public HistoryDto(AssetDto record, String txid, String timestamp, boolean isdelete) {
        this.record = record;
        Txid = txid;
        Timestamp = timestamp;
        Isdelete = isdelete;
    }
    public HistoryDto(){

    }
}
