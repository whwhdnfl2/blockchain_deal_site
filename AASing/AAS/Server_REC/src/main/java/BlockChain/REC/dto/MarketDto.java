package BlockChain.REC.dto;

import com.google.gson.JsonObject;

public class MarketDto {
    private String DocType;
    private String ID;
    private String Seller;
    private String Buyer;
    private int REC;
    private int KRW;
    private String state;
    private String time;

    public String getDocType() {
        return DocType;
    }

    public void setDocType(String docType) {
        DocType = docType;
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getSeller() {
        return Seller;
    }

    public void setSeller(String seller) {
        Seller = seller;
    }

    public String getBuyer() {
        return Buyer;
    }

    public void setBuyer(String buyer) {
        Buyer = buyer;
    }

    public int getREC() {
        return REC;
    }

    public void setREC(int REC) {
        this.REC = REC;
    }

    public int getKRW() {
        return KRW;
    }

    public void setKRW(int KRW) {
        this.KRW = KRW;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public MarketDto(String docType, String ID, String seller, String buyer, int REC, int KRW, String state, String time) {
        DocType = docType;
        this.ID = ID;
        Seller = seller;
        Buyer = buyer;
        this.REC = REC;
        this.KRW = KRW;
        this.state = state;
        this.time = time;
    }
    public MarketDto(JsonObject asset){
        this.DocType = asset.get("docType").getAsString();
        this.ID = asset.get("ID").getAsString();
        this.Seller = asset.get("seller").getAsString();
        this.Buyer = asset.get("buyer").getAsString();
        this.REC = asset.get("REC").getAsInt();
        this.KRW = asset.get("KRW").getAsInt();
        this.state = asset.get("State").getAsString();
        this.time = asset.get("Time").getAsString();
    }
}
