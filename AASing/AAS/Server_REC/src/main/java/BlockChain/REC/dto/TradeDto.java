package BlockChain.REC.dto;

public class TradeDto {
    private String id;
    private String buyer;
    private int krw;
    private int rec;

    public TradeDto(String id, String buyer, int krw, int rec) {
        this.id = id;
        this.buyer = buyer;
        this.krw = krw;
        this.rec = rec;
    }

    @Override
    public String toString() {
        return "TradeDto{" +
                "id='" + id + '\'' +
                ", buyer='" + buyer + '\'' +
                ", krw=" + krw +
                ", rec=" + rec +
                '}';
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBuyer() {
        return buyer;
    }

    public void setBuyer(String buyer) {
        this.buyer = buyer;
    }

    public int getKrw() {
        return krw;
    }

    public void setKrw(int krw) {
        this.krw = krw;
    }

    public int getRec() {
        return rec;
    }

    public void setRec(int rec) {
        this.rec = rec;
    }
}
