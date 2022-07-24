package BlockChain.REC.service;

import BlockChain.REC.domain.Account;
import BlockChain.REC.repository.AccountRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import static BlockChain.REC.config.MagicValue.EXISTS_USERNAME_MESSAGE;
import static BlockChain.REC.config.MagicValue.LOGIN_FAIL_MESSAGE;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class AccountServiceTest {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    AccountService accountService;

    @Test
    void 회원가입() throws Exception{
        //given
        String username = "김재현";
        String password = "12345";

        Account account = createAccount(username, password);

        //when
        Long saveID = accountService.join(account);

        //then
        assertEquals(account, accountRepository.findOne(saveID));

    }
    @Test()
    public void 중복회원가입() throws IllegalStateException {
        //given
        String username = "동일인물";
        String password = "12345";

        Account accountA = createAccount(username, password);
        Account accountB = createAccount(username, password);


        //when
        accountService.join(accountA);

        //then
        IllegalStateException thrown = assertThrows(IllegalStateException.class, () -> accountService.join(accountB));
        assertEquals(EXISTS_USERNAME_MESSAGE, thrown.getMessage());
    }

    @Test
    void 로그인_성공() throws Exception{
        String username = "김재현";
        String password = "12345";

        Account account = createAccount(username, password);

        accountService.join(account);

        //when
        boolean result = accountService.Login(username,password);

        //then
        assertEquals(result,true);
    }

    private Account createAccount(String username, String password) {
        Account account = new Account();
        account.setUsername(username);
        account.setPassword(password);
        return account;
    }

    @Test
    void 로그인_실패() throws Exception{
        String username = "김재현";
        String password = "12345";
        String wrongPassword = "A12345";

        Account account = createAccount(username, password);

        //when
        accountService.join(account);

        //then
        IllegalStateException thrown = assertThrows(IllegalStateException.class, () -> accountService.Login(username,wrongPassword));
        assertEquals(LOGIN_FAIL_MESSAGE, thrown.getMessage());
    }
}