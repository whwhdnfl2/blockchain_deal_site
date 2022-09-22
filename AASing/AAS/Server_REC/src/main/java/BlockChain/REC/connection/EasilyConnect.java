package BlockChain.REC.connection;

import BlockChain.REC.dto.AssetDto;
import BlockChain.REC.dto.MarketDto;
import BlockChain.REC.dto.MemberDto;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import io.grpc.ManagedChannel;
import io.grpc.netty.shaded.io.grpc.netty.GrpcSslContexts;
import io.grpc.netty.shaded.io.grpc.netty.NettyChannelBuilder;
import lombok.Data;
import org.hyperledger.fabric.client.*;
import org.hyperledger.fabric.client.identity.*;

import java.io.IOException;
import java.lang.reflect.Member;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.InvalidKeyException;
import java.security.cert.CertificateException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.concurrent.TimeUnit;

@Data
public class EasilyConnect {
    private MemberDto memberDto;
    private Contract contract;

    public EasilyConnect(MemberDto memberDto) throws Exception {
        this.memberDto = memberDto;
        var channel = newGrpcConnection();
        var builder = Gateway.newInstance().identity(newIdentity()).signer(newSigner()).connection(channel)
                // Default timeouts for different gRPC calls
                .evaluateOptions(options -> options.withDeadlineAfter(5, TimeUnit.SECONDS))
                .endorseOptions(options -> options.withDeadlineAfter(15, TimeUnit.SECONDS))
                .submitOptions(options -> options.withDeadlineAfter(5, TimeUnit.SECONDS))
                .commitStatusOptions(options -> options.withDeadlineAfter(1, TimeUnit.MINUTES));
        var gateway = builder.connect();
        var network = gateway.getNetwork(this.memberDto.getChannelName());
        this.contract = network.getContract(memberDto.getChaincodeName());
    }


    private ManagedChannel newGrpcConnection() throws IOException, CertificateException {
        var tlsCertReader = Files.newBufferedReader(this.memberDto.getTlsCertPath());
        var tlsCert = Identities.readX509Certificate(tlsCertReader);
        return NettyChannelBuilder.forTarget(this.memberDto.getPeerEndpoint())
                .sslContext(GrpcSslContexts.forClient().trustManager(tlsCert).build()).overrideAuthority(this.memberDto.getOverrideAuth())
                .build();
    }

    private Identity newIdentity() throws IOException, CertificateException {
        var certReader = Files.newBufferedReader(memberDto.getCertPath());
        var certificate = Identities.readX509Certificate(certReader);
        return new X509Identity(memberDto.getMspID(), certificate);
    }

    private Signer newSigner() throws IOException, InvalidKeyException {
        var keyReader = Files.newBufferedReader(getPrivateKeyPath());
        var privateKey = Identities.readPrivateKey(keyReader);
        return Signers.newPrivateKeySigner(privateKey);
    }

    private Path getPrivateKeyPath() throws IOException {
        try (var keyFiles = Files.list(memberDto.getKeyDirPath())) {
            return keyFiles.findFirst().orElseThrow();
        }
    }

    public JsonElement GetAllAssets() throws GatewayException {
        var result = contract.evaluateTransaction("GetAllAssets");
        System.out.println(prettyJson(result));
        return prettyJson(result);
    }

    public JsonElement getAssetByID() throws GatewayException{
        System.out.println(this.memberDto.toString());
        var result = contract.evaluateTransaction("ReadAsset",this.memberDto.getID());
        System.out.println(prettyJson(result));

        return prettyJson(result);
    }

    public JsonElement getAssetHistory() throws GatewayException{
        System.out.println("MspID : %s".format(memberDto.getMspID()));
        var result = contract.evaluateTransaction("GetAssetHistory", this.memberDto.getID());
        System.out.println(prettyJson(result));
        return prettyJson(result);
    }

    public void createAsset(AssetDto assetDto) throws EndorseException, SubmitException, CommitStatusException, CommitException{
        contract.submitTransaction("CreateAsset",
                assetDto.getID(),
                Integer.toString(assetDto.getREC()),
                Integer.toString(assetDto.getKRW()),
                Integer.toString(assetDto.getRTKRW()),
                Integer.toString(assetDto.getRTREC()),
                assetDto.getRTpeople(),
                assetDto.getRole()
        );
    }

    /*여기부터 market*/
    public JsonElement getMarket() throws GatewayException, CommitException{
        var result = contract.evaluateTransaction("GetAllAssets");
        System.out.println(prettyJson(result));
        return prettyJson(result);
    }




    /**
     * This type of transaction would typically only be getAssets once by an application
     * the first time it was started after its initial deployment. A new version of
     * the chaincode deployed later would likely not need to getAssets an "init" function.
     */
    private void initLedger() throws EndorseException, SubmitException, CommitStatusException, CommitException {
        System.out.println("\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger");

        contract.submitTransaction("InitLedger");

        System.out.println("*** Transaction committed successfully");
    }

    private JsonElement prettyJson(final byte[] json) {
        return prettyJson(new String(json, StandardCharsets.UTF_8));
    }

    private JsonElement prettyJson(final String json) {
        return JsonParser.parseString(json);
    }

    /**
     * submitTransaction() will throw an error containing details of any error
     * responses from the smart contract.
     */
    private void updateNonExistentAsset() {
        try {
            System.out.println("\n--> Submit Transaction: UpdateAsset asset70, asset70 does not exist and should return an error");

            contract.submitTransaction("UpdateAsset", "asset70", "blue", "5", "Tomoko", "300");

            System.out.println("******** FAILED to return an error");
        } catch (EndorseException | SubmitException | CommitStatusException e) {
            System.out.println("*** Successfully caught the error: ");
            e.printStackTrace(System.out);
            System.out.println("Transaction ID: " + e.getTransactionId());

            var details = e.getDetails();
            if (!details.isEmpty()) {
                System.out.println("Error Details:");
                // for (var detail : details) {
                // 	System.out.println("- address: " + detail.getAddress() + ", mspId: " + detail.getMspId()
                // 			+ ", message: " + detail.getMessage());
                // }
            }
        } catch (CommitException e) {
            System.out.println("*** Successfully caught the error: " + e);
            e.printStackTrace(System.out);
            System.out.println("Transaction ID: " + e.getTransactionId());
            System.out.println("Status code: " + e.getCode());
        }
    }
}
