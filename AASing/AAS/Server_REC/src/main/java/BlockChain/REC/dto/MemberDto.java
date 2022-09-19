package BlockChain.REC.dto;

import BlockChain.REC.domain.Account;
import java.nio.file.Path;
import java.nio.file.Paths;
import lombok.Data;
import lombok.Getter;

@Data
public class MemberDto {

  private String original_id;
  private String mspID;
  private String channelName;
  private String chaincodeName;

  // Path to crypto materials.
  private Path cryptoPath;
  // Path to user certificate.
  private Path certPath;
  // Path to user private key directory.
  private Path keyDirPath;
  // Path to peer tls certificate.
  private Path tlsCertPath;
  private final Path basePath = Paths.get("..","AASing","AAS");
  private String peerEndpoint;
  private String overrideAuth;

  public MemberDto(Account account) {
    this.original_id = account.getMsp_id();
    this.mspID = String.format("%sMSP", account.getMsp_id());
    this.channelName = account.getChannel_name();
    this.chaincodeName = account.getChaincode_name();
    this.cryptoPath = Paths.get("..","organizations", "peerOrganizations",
        String.format("%s.example.com", this.original_id));
    this.certPath = this.cryptoPath.resolve(Paths.get("users",
        String.format("User1@%s.example.com", this.original_id), "msp", "signcerts",
        String.format("User1@%s.example.com-cert.pem", this.original_id)));
    this.keyDirPath = this.cryptoPath.resolve(Paths.get("users", String.format("User1@%s.example.com", this.original_id), "msp", "keystore"));;
    this.tlsCertPath = this.cryptoPath.resolve(Paths.get("peers",
        String.format("peer0.%s.example.com", this.original_id), "tls", "ca.crt"));;
    this.peerEndpoint = account.getPeer_end_point();
    this.overrideAuth = String.format("peer0.%s.example.com", this.original_id);

    System.out.println("original_id : " + original_id);
    System.out.println("mspID : " + mspID);
    System.out.println("cryptoPath : " + cryptoPath);
    System.out.println("certPath : " + certPath);
    System.out.println("keyDirPath : " + keyDirPath);
    System.out.println("tlsCertPath : " + tlsCertPath);
    System.out.println("channelName : " + channelName);
    System.out.println("chaincodeName : " + chaincodeName);
    System.out.println("peerEndpoint : " + peerEndpoint);
    System.out.println("overrideAuth : " + overrideAuth);
  }
}
