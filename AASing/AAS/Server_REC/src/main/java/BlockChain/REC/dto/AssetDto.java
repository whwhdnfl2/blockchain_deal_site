package BlockChain.REC.dto;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import lombok.Data;

@Data
public class AssetDto {
  private String docType;
  private String ID;
  private String owner;
  private Long REC;
  private Long KRW;
  private String Role;


  public AssetDto(JsonObject asset) {
        this.docType = asset.get("docType").getAsString();
        this.ID = asset.get("ID").getAsString();
        this.owner = asset.get("owner").getAsString();
        this.REC = asset.get("REC").getAsLong();
        this.KRW = asset.get("KRW").getAsLong();
        this.Role = asset.get("Role").getAsString();
  }
}
