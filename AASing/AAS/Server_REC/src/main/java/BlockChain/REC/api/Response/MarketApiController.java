package BlockChain.REC.api.Response;

import BlockChain.REC.repository.AccountRepository;
import BlockChain.REC.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MarketApiController {
    private final AccountService accountService;
    private final AccountRepository accountRepository;

}
