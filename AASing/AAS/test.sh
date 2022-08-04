#!/bin/bash

source scripts/utils.sh
. scripts/envVar.sh
. scripts/ccutils.sh

export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/

#여기 tax나 koreapower로 바꾸면 댐
setGlobals tax



#peer lifecycle chaincode querycommitted --channelID people  --name people --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem"

#peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C people -n people --peerAddresses localhost:11061 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/koreapower.example.com/peers/peer0.koreapower.example.com/tls/ca.crt" -c '{"function":"InitLedger","Args":[]}'


# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C revenue -n revenue -c '{"Args":["CreateAsset","asset1","blue","5","tom","35"]}'
peer chaincode query -C revenue -n revenue -c '{"Args":["QueryAssets", "{\"selector\":{\"docType\":\"asset\",\"owner\":\"tom\"}, \"use_index\":[\"_design/indexOwnerDoc\", \"indexOwner\"]}"]}'
