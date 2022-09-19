package BlockChain.REC.connection;

import BlockChain.REC.dto.MemberDto;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonParser;
import io.grpc.ManagedChannel;
import io.grpc.netty.shaded.io.grpc.netty.GrpcSslContexts;
import io.grpc.netty.shaded.io.grpc.netty.NettyChannelBuilder;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.InvalidKeyException;
import java.security.cert.CertificateException;
import java.util.concurrent.TimeUnit;
import lombok.Data;
import org.hyperledger.fabric.client.CommitException;
import org.hyperledger.fabric.client.CommitStatusException;
import org.hyperledger.fabric.client.Contract;
import org.hyperledger.fabric.client.EndorseException;
import org.hyperledger.fabric.client.Gateway;
import org.hyperledger.fabric.client.GatewayException;
import org.hyperledger.fabric.client.SubmitException;
import org.hyperledger.fabric.client.identity.Identities;
import org.hyperledger.fabric.client.identity.Identity;
import org.hyperledger.fabric.client.identity.Signer;
import org.hyperledger.fabric.client.identity.Signers;
import org.hyperledger.fabric.client.identity.X509Identity;

@Data
public class Grpc {

  private final Contract contract;

  private final MemberDto memberDto;

  private final Gson gson = new GsonBuilder().setPrettyPrinting().create();

  public Grpc(final Gateway gateway, MemberDto member) {
    this.memberDto = member;
    // Get a network instance representing the channel where the smart contract is
    // deployed.
    var network = gateway.getNetwork(memberDto.getChannelName());

    // Get the smart contract from the network.
    contract = network.getContract(memberDto.getChaincodeName());
  }


  public void run() throws GatewayException, CommitException {
    // Initialize a set of asset data on the ledger using the chaincode 'InitLedger' function.
    //initLedger();

    // Return all the current assets on the ledger.
    //getAllAssets();

    // Create a new asset on the ledger.
    //createAsset();
    getAllAssets();

    // Update an existing asset asynchronously.
    // transferAssetAsync();

    // Get the asset details by assetID.
    // readAssetById();

    // Update an asset which does not exist.
    // updateNonExistentAsset();
  }

  private void getAllAssets() throws GatewayException {
    System.out.println("\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger");

    var result = contract.evaluateTransaction("GetAllAssets");

    System.out.println("*** Result: " + prettyJson(result));
  }
  private String prettyJson(final byte[] json) {
    return prettyJson(new String(json, StandardCharsets.UTF_8));
  }
  private String prettyJson(final String json) {
    var parsedJson = JsonParser.parseString(json);
    return gson.toJson(parsedJson);
  }

  private void createAsset() throws EndorseException, SubmitException, CommitStatusException, CommitException {
    System.out.println("\n--> Submit Transaction: CreateAsset, creates new asset with ID, Color, Size, Owner and AppraisedValue arguments");

    contract.submitTransaction("CreateAsset", "sex3", "fuck", "5", "300000","done");

    System.out.println("*** Transaction committed successfully");
  }

}
