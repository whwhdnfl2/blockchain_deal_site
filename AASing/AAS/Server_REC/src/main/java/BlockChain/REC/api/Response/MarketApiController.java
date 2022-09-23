package BlockChain.REC.api.Response;

import BlockChain.REC.connection.EasilyConnect;
import BlockChain.REC.domain.Account;
import BlockChain.REC.dto.AssetDto;
import BlockChain.REC.dto.MarketDto;
import BlockChain.REC.dto.MemberDto;
import BlockChain.REC.dto.TradeDto;
import BlockChain.REC.repository.AccountRepository;
import BlockChain.REC.service.AccountService;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.yaml.snakeyaml.error.Mark;

import javax.validation.Valid;
import java.lang.reflect.Member;
import java.time.LocalDateTime;
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
            MarketDto marketDto = new MarketDto(asset);
            if(marketDto.getState().equals("SALE")){
                marketDtoList.add(marketDto);
            }
        }
        return marketDtoList;
    }
    //진짜 단순하게 문자열만 보내면 됨 따음표도 팰요없음
    @PostMapping("/api/Market/myinfo")
    public List<MarketDto> getMyInfo(@RequestBody @Valid String ID) throws Exception{
        System.out.println(ID);
        Account account = accountRepository.findByUsername("koreapower_admin");
        MemberDto memberDto = new MemberDto(account);
        Account NOWaccount = accountRepository.findByUsername(ID);
        MemberDto memberDto2 = new MemberDto(NOWaccount);
        EasilyConnect easilyConnect = new EasilyConnect(memberDto);
        JsonArray Assets = easilyConnect.getMarket().getAsJsonArray();
        List<MarketDto> marketDtoList = new ArrayList<>();
        for(int i=0;i<Assets.size();++i){
            JsonObject asset = Assets.get(i).getAsJsonObject();
            MarketDto marketDto = new MarketDto(asset);
            if(memberDto2.getOriginal_id().equals("buyer")){
                if(marketDto.getBuyer().equals(ID) && marketDto.getState().equals("DONE") ){
                    marketDtoList.add(marketDto);
                }
            }
            else if(memberDto2.getOriginal_id().equals("seller")){
                if(marketDto.getSeller().equals(ID) && marketDto.getState().equals("DONE")){
                    marketDtoList.add(marketDto);
                }
            }
        }
        return marketDtoList;
    }


    @PostMapping("/api/Market/trade")
    public String trading(@RequestBody @Valid TradeDto tradeDto) throws Exception{
        System.out.println(tradeDto.toString());
        Account buyerAccount = accountRepository.findByUsername(tradeDto.getBuyer());
        MemberDto market = new MemberDto(buyerAccount);
        EasilyConnect easilyConnect =  new EasilyConnect(market);
        MarketDto marketDto = new MarketDto(easilyConnect.getAssetByID(tradeDto.getId()).getAsJsonObject());
        System.out.println(marketDto.toString());
        marketDto.setBuyer(tradeDto.getBuyer());
        marketDto.setREC(marketDto.getREC() - tradeDto.getRec());
        marketDto.setKRW(marketDto.getKRW() - tradeDto.getKrw());
        marketDto.setState("DONE");
        marketDto.setTime(LocalDateTime.now().toString());
        easilyConnect.UpdateAsset(marketDto);


        //MarketDto traded = new MarketDto()


        return "oh";
    }
    /*
    {
    "id" : "asd",
    "buyer" : "sell",
    "krw" : 5,
    "rec" : 10
    }
     */
}
