package BlockChain.REC.dto;

import com.google.gson.JsonObject;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class TaxDto {
    private String doctype;
    private String id;
    private String state;
    private int tax;

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
