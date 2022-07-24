package BlockChain.REC.api;

import BlockChain.REC.api.Response.AccountResponse;
import BlockChain.REC.api.Response.CommonResponse;
import BlockChain.REC.domain.Account;
import BlockChain.REC.service.AccountService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static BlockChain.REC.config.MagicValue.*;

@RestController
@RequiredArgsConstructor
public class AccountApiController {

    private final AccountService accountService;

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
     * 회원가입 API
     * @param account 계정정보
     * @return AccountResponse
     */

    @PostMapping("/api/signin")
    public AccountResponse saveAccount(@RequestBody @Valid Account account){
        System.out.println(account.getPassword());
        Long id = accountService.join(account);
        return new AccountResponse(true,CREATED_STATUS_CODE,EMPTY_MESSAGE,id);
    }

    /**
     * 로그인 API
     * @param account 계정정보
     * @return CommonResponse
     */
    @PostMapping("/api/login")
    public CommonResponse Login(@RequestBody @Valid Account account){
        boolean result = accountService.Login(account.getUsername(), account.getPassword());
        String msg = (result) ? LOGIN_SUCCESS_MESSAGE : LOGIN_FAIL_MESSAGE;
        return new CommonResponse(result,SUCCESS_STATUS_CODE,msg);
    }

}
