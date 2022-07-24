package BlockChain.REC.api;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String name;
}
