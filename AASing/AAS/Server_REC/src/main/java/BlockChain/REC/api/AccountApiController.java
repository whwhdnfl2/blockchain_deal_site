package BlockChain.REC.api;

import BlockChain.REC.api.Response.AccountResponse;
import BlockChain.REC.api.Response.CommonResponse;
import BlockChain.REC.connection.BlockChainConnect;
import BlockChain.REC.domain.Account;
import BlockChain.REC.dto.MemberDto;
import BlockChain.REC.repository.AccountRepository;
import BlockChain.REC.service.AccountService;

import lombok.RequiredArgsConstructor;
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
        BlockChainConnect blockChainConnect = new BlockChainConnect(memberDto);
        blockChainConnect.connection();
        return "Success";
    }


}
