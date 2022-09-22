package BlockChain.REC.api.Response;

import BlockChain.REC.connection.EasilyConnect;
import BlockChain.REC.domain.Account;
import BlockChain.REC.dto.MarketDto;
import BlockChain.REC.dto.MemberDto;
import BlockChain.REC.repository.AccountRepository;
import BlockChain.REC.service.AccountService;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class MarketApiController {
    private final AccountService accountService;
    private final AccountRepository accountRepository;
    @GetMapping("/api/Market")
    public List<MarketDto> getMarket() throws Exception{
        Account account = accountRepository.findByUsername("koreapower_admin");
        MemberDto memberDto = new MemberDto(account);
        EasilyConnect easilyConnect = new EasilyConnect(memberDto);
        JsonArray Assets = easilyConnect.getMarket().getAsJsonArray();
        List<MarketDto> marketDtoList = new ArrayList<>();
        for(int i=0;i<Assets.size();++i){
            JsonObject asset = Assets.get(i).getAsJsonObject();
            MarketDto marketDto = new MarketDto(asset);\
            if(marketDto.getState().equals("SALE")){
                marketDtoList.add(marketDto);
            }
        }
        return marketDtoList;
    }
}
