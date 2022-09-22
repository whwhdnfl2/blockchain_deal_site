package BlockChain.REC.api;

import BlockChain.REC.api.Response.CommonResponse;
import BlockChain.REC.connection.EasilyConnect;
import BlockChain.REC.domain.Account;
import BlockChain.REC.dto.AssetDto;
import BlockChain.REC.dto.HistoryDto;
import BlockChain.REC.dto.MemberDto;
import BlockChain.REC.repository.AccountRepository;
import BlockChain.REC.service.AccountService;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.util.ArrayList;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.units.qual.A;
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

    //여기부터 api
    @GetMapping("/api/getall/{id}")
    public List<AssetDto> testConnect(@PathVariable String id) throws Exception {
        Account account = accountRepository.findByUsername(id);
        MemberDto memberDto = new MemberDto(account);
        EasilyConnect easilyConnect = new EasilyConnect(memberDto);
        JsonArray Assets = easilyConnect.GetAllAssets().getAsJsonArray();
        List<AssetDto> assetDtoList = new ArrayList<>();
        for(int i=0;i<Assets.size();++i){
            JsonObject asset = Assets.get(i).getAsJsonObject();
            assetDtoList.add(new AssetDto(asset));
        }
        return assetDtoList;
    }
    @GetMapping("api/marketMaterial")
    public String MarketMaterial() throws Exception{
        System.out.println("whjat");
    }


    @GetMapping("/api/getHistory/{id}")
    public String getHistory(@PathVariable String id) throws Exception{
        Account account = accountRepository.findByUsername(id);
        MemberDto memberDto = new MemberDto(account);
        EasilyConnect easilyConnect = new EasilyConnect(memberDto);
        JsonArray Assets = easilyConnect.getAssetHistory().getAsJsonArray();
//        List<HistoryDto> historyDtoList = new ArrayList<>();
//        for(int i=0;i<Assets.size();++i){
//            JsonObject asset = Assets.get(i).getAsJsonObject();
//            historyDtoList.add(new HistoryDto(asset));
//        }
        return Assets.toString();
    }

    @GetMapping("/api/logininfo/{id}")
    public AssetDto getLogininfo(@PathVariable String id) throws Exception{
        Account account = accountRepository.findByUsername(id);
        MemberDto memberDto = new MemberDto(account);
        EasilyConnect easilyConnect = new EasilyConnect(memberDto);
        JsonElement Assets = easilyConnect.getAssetByID();
        AssetDto assetDto = new AssetDto(Assets.getAsJsonObject());
        return assetDto;
    }



    @PostMapping ("/api/createAsset/{id}")
    public String createAssets(@PathVariable String id , @RequestBody @Valid AssetDto assetDto) throws Exception {
        Account account = accountRepository.findByUsername(id);
        MemberDto memberDto = new MemberDto(account);
        System.out.println(assetDto);
        try {
            EasilyConnect easilyConnect = new EasilyConnect(memberDto);
            easilyConnect.createAsset(assetDto);
        } finally {
            return "good";
        }
//        작성예시
//        {
//            "ID" : "asset5",
//                "REC" : 10,
//                "KRW" : 2("(0,
//                "RTKRW" : 30,
//                "RTpeople" : "sex",
//                "Role" : "bottom",
//                "RTREC" : 20
//        }
    }

}
