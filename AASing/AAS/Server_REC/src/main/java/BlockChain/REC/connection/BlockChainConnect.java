package BlockChain.REC.connection;

import BlockChain.REC.dto.MemberDto;
import io.grpc.ManagedChannel;
import io.grpc.netty.shaded.io.grpc.netty.GrpcSslContexts;
import io.grpc.netty.shaded.io.grpc.netty.NettyChannelBuilder;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.InvalidKeyException;
import java.security.cert.CertificateException;
import java.util.concurrent.TimeUnit;
import lombok.Data;
import org.hyperledger.fabric.client.Gateway;
import org.hyperledger.fabric.client.identity.Identities;
import org.hyperledger.fabric.client.identity.Identity;
import org.hyperledger.fabric.client.identity.Signer;
import org.hyperledger.fabric.client.identity.Signers;
import org.hyperledger.fabric.client.identity.X509Identity;

@Data
public class BlockChainConnect {

  private final MemberDto memberDto;

  private ManagedChannel managedChannel;
  public BlockChainConnect(MemberDto member) {
    this.memberDto = member;
  }

  public Gateway connection() throws Exception {
    managedChannel = newGrpcConnection();

    var builder = Gateway.newInstance().identity(newIdentity()).signer(newSigner()).connection(managedChannel)
        // Default timeouts for different gRPC calls
        .evaluateOptions(options -> options.withDeadlineAfter(5, TimeUnit.SECONDS))
        .endorseOptions(options -> options.withDeadlineAfter(15, TimeUnit.SECONDS))
        .submitOptions(options -> options.withDeadlineAfter(5, TimeUnit.SECONDS))
        .commitStatusOptions(options -> options.withDeadlineAfter(1, TimeUnit.MINUTES));
    return builder.connect();
  }
  public void closeChannel() throws InterruptedException {
    managedChannel.shutdownNow().awaitTermination(500, TimeUnit.SECONDS);
  }
  public ManagedChannel newGrpcConnection() throws IOException, CertificateException {
    var tlsCertReader = Files.newBufferedReader(memberDto.getTlsCertPath());
    var tlsCert = Identities.readX509Certificate(tlsCertReader);

    return NettyChannelBuilder.forTarget(memberDto.getPeerEndpoint())
        .sslContext(GrpcSslContexts.forClient().trustManager(tlsCert).build()).overrideAuthority(
            memberDto.getOverrideAuth())
        .build();
  }

  public Identity newIdentity() throws IOException, CertificateException {
    var certReader = Files.newBufferedReader(memberDto.getCertPath());
    var certificate = Identities.readX509Certificate(certReader);

    return new X509Identity(memberDto.getOriginal_id(), certificate);
  }
  public Signer newSigner() throws IOException, InvalidKeyException {
    var keyReader = Files.newBufferedReader(getPrivateKeyPath());
    var privateKey = Identities.readPrivateKey(keyReader);
    System.out.println(privateKey.getEncoded().toString());

    return Signers.newPrivateKeySigner(privateKey);
  }

  public Path getPrivateKeyPath() throws IOException {
    try (var keyFiles = Files.list(memberDto.getKeyDirPath())) {
      return keyFiles.findFirst().orElseThrow();
    }
  }
}
