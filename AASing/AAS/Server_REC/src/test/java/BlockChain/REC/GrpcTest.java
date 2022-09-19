package BlockChain.REC;

import static org.junit.jupiter.api.Assertions.assertEquals;

import BlockChain.REC.connection.BlockChainConnect;
import BlockChain.REC.connection.Grpc;
import BlockChain.REC.domain.Account;
import BlockChain.REC.dto.MemberDto;
import BlockChain.REC.repository.AccountRepository;
import BlockChain.REC.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@Transactional(readOnly = true)
public class GrpcTest {
  @Autowired
  private AccountRepository accountRepository;

  @Test
  void 모든에셋받기() throws Exception {
    String User = "User1";
    Account account = accountRepository.findByUsername(User);
    MemberDto memberDto = new MemberDto(account);
    System.out.println(memberDto);
    BlockChainConnect blockChainConnect = new BlockChainConnect(memberDto);
    blockChainConnect.connection();
    assertEquals(1,1);
  }

}
