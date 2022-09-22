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
  private int RTKRW;
  private String RTpeople;

    @Override
    public String toString() {
        return "AssetDto{" +
                "docType='" + docType + '\'' +
                ", ID='" + ID + '\'' +
                ", REC=" + REC +
                ", KRW=" + KRW +
                ", RTKRW=" + RTKRW +
                ", RTpeople='" + RTpeople + '\'' +
                ", Role='" + Role + '\'' +
                ", RTREC=" + RTREC +
                '}';
    }

    private String Role;
  private int RTREC;

  public AssetDto(JsonObject asset) {
        this.docType = asset.get("docType").getAsString();
        this.ID = asset.get("ID").getAsString();
        this.REC = asset.get("REC").getAsInt();
        this.KRW = asset.get("KRW").getAsInt();
        this.Role = asset.get("Role").getAsString();
        this.RTKRW = asset.get("RTKRW").getAsInt();
        this.RTREC = asset.get("RTREC").getAsInt();
        this.RTpeople = asset.get("RTpeople").getAsString();
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

    public AssetDto() {

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

    public int getRTKRW() {
        return RTKRW;
    }

    public void setRTKRW(int RTKRW) {
        this.RTKRW = RTKRW;
    }

    public String getRTpeople() {
        return RTpeople;
    }

    public void setRTpeople(String RTpeople) {
        this.RTpeople = RTpeople;
    }

    public String getRole() {
        return Role;
    }

    public void setRole(String role) {
        Role = role;
    }

    public int getRTREC() {
        return RTREC;
    }

    public void setRTREC(int RTREC) {
        this.RTREC = RTREC;
    }
}
