package BlockChain.REC.dto;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import lombok.Data;

@Data
public class AssetDto {
  private String docType;
  private String ID;
  private int REC;
  private int KRW;
  private String Role;



    @Override
    public String toString() {
        return "AssetDto{" +
                "docType='" + docType + '\'' +
                ", ID='" + ID + '\'' +
                ", REC=" + REC +
                ", KRW=" + KRW +
                ", Role='" + Role + '\'' +
                '}';
    }

  public AssetDto(JsonObject asset) {
        this.docType = asset.get("docType").getAsString();
        this.ID = asset.get("ID").getAsString();
        this.REC = asset.get("REC").getAsInt();
        this.KRW = asset.get("KRW").getAsInt();
        this.Role = asset.get("Role").getAsString();
  }
  public AssetDto(){

  }
    public String getDocType() {
        return docType;
    }

    public void setDocType(String docType) {
        this.docType = docType;
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
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

    public String getRole() {
        return Role;
    }

    public void setRole(String role) {
        Role = role;
    }

}
