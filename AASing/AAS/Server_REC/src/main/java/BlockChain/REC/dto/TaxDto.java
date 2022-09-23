package BlockChain.REC.dto;

import com.google.gson.JsonObject;

public class TaxDto {
    private String doctype;
    private String id;
    private String state;
    private int tax;

    public String getDoctype() {
        return doctype;
    }

    public void setDoctype(String doctype) {
        this.doctype = doctype;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public int getTax() {
        return tax;
    }

    public void setTax(int tax) {
        this.tax = tax;
    }

    public TaxDto(String doctype, String id, String state, int tax) {
        this.doctype = doctype;
        this.id = id;
        this.state = state;
        this.tax = tax;
    }
    public TaxDto(JsonObject asset){
        this.doctype="asset";
        this.id = "TAX";
        this.state = "REVENUE";
        this.tax = asset.get("Tax").getAsInt();
    }
}
