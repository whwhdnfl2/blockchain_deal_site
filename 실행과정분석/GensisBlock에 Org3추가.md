# Org3를 기본적으로 추가한 상태로 시작

1.  Cryptogen을 이용해서 Key를 생성한다. 
    1.  organizations/cryptogen 에 Org3 암호화 관련 yaml파일을 넣어둔다.
    2.  network.sh 파일의 createOrgs에 암호화 과정을 추가해준다.
        ```python
    # ORG3도 암호화
    infoln "Creating Org3 Identities"

    set -x
    cryptogen generate --config=./organizations/cryptogen/crypto-config-org3.yaml --output="organizations"
    res=$?
    { set +x; } 2>/dev/null
    if [ $res -ne 0 ]; then
      fatalln "Failed to generate certificates..."
    fi
        ```
        


2.  
