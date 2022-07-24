package BlockChain.REC.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;

import static BlockChain.REC.domain.Role.NOT_PERMITTED;

@Entity
@Getter @Setter
public class Account {

    @Id @GeneratedValue
    private Long id;

    @Column(name = "user_id",nullable = false, unique = true)
    private String username;

    private String AssetID;

    private String password;

    private String name;

    @Enumerated(EnumType.STRING)
    private Role role;

    public Account createAccount(Account account, PasswordEncoder passwordEncoder){
        account.setPassword(passwordEncoder.encode(password));
        account.setRole(NOT_PERMITTED);
        return account;
    }

}
