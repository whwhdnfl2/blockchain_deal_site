package BlockChain.REC.api;

import BlockChain.REC.api.Response.AccountResponse;
import BlockChain.REC.api.Response.CommonResponse;
import BlockChain.REC.connection.App;
import BlockChain.REC.connection.BlockChainConnect;
import BlockChain.REC.domain.Account;
import BlockChain.REC.dto.MemberDto;
import BlockChain.REC.repository.AccountRepository;
import BlockChain.REC.service.AccountService;

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
import java.nio.file.Paths;
import java.security.InvalidKeyException;
import java.security.cert.CertificateException;
import java.time.Instant;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
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
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static BlockChain.REC.config.MagicValue.*;

@RestController
@RequiredArgsConstructor
public class AccountApiController {

    private final AccountService accountService;
    private final AccountRepository accountRepository;

    /**
     * username 중복 검사 API
     * @param username user_id
     * @return CommonResponse
     */
    @GetMapping("/api/signin/exists")
    public CommonResponse checkUsername(@RequestParam @Valid String username){
        boolean success = accountService.validateDuplicateUsername(username);
        String msg = (!success) ? UNIQUE_USERNAME_MESSAGE : EXISTS_USERNAME_MESSAGE;
        return new CommonResponse(success,SUCCESS_STATUS_CODE,msg);
    }

    /**
     * 로그인 API
     * @return CommonResponse
     */
    @PostMapping("/api/login")
    public CommonResponse Login(@RequestBody @Valid LoginRequest request){
        boolean result = accountService.Login(request.getUsername(), request.getPassword());
        String msg = (result) ? LOGIN_SUCCESS_MESSAGE : LOGIN_FAIL_MESSAGE;
        return new CommonResponse(result,SUCCESS_STATUS_CODE,msg);
    }


    @GetMapping("/api")
    public String start() throws Exception {
        String User = "User1";
        Account account = accountRepository.findByUsername(User);
        MemberDto memberDto = new MemberDto(account);
        new App(memberDto);
        return "Success";


    }


}
