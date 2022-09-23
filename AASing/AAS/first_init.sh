#!/bin/bash

source scripts/utils.sh
. scripts/envVar.sh
. scripts/ccutils.sh

export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/

setGlobals buyer
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C people -n people -c '{"Args":["CreateAsset","Seller_User1","8","3000000","25000","","User1","buyer"]}' 
#  peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C people -n people -c '{"Args":["CreateAsset","민준","256","50000","25000","","User1","buyer"]}' 
#  peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C people -n people -c '{"Args":["CreateAsset","재석","48","100000","25000","","User1","buyer"]}' 
#  peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C people -n people -c '{"Args":["CreateAsset","아리","73","90000","25000","","User2","seller"]}' 
#  peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C people -n people -c '{"Args":["CreateAsset","노틸러스","27","25000","25000","","User2","seller"]}' 
#  peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C people -n people -c '{"Args":["ReadAsset","Seller_User1"]}' 
#  peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C people -n people -c '{"Args":["GetAssetHistory","Seller_User1"]}' 

setGlobals seller
#peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C people -n people -c '{"Args":["CreateAsset","asset2","fuck","5","25000","done"]}' 
# peer chaincode query -C people -n people -c '{"Args":["GetAllAssets"]}' 

setGlobals tax
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C revenue -n revenue -c '{"Args":["InitLedger"]}' 
# peer chaincode query -C revenue -n revenue -c '{"Args":["GetAllAssets"]}' 

setGlobals koreapower
 peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C market -n market -c '{"Args":["CreateAsset","Seller_User1","Seller_User1"," ","5","3000","SALE","2022-04-2123:15:45645"]}' 
 peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C market -n market -c '{"Args":["CreateAsset","Seller_User1","Seller_User1"," ","7","25000","SALE","2022-0시 간645"]}' 
 peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C market -n market -c '{"Args":["CreateAsset","Seller_User2","Seller_User2"," ","6","1000000","SALE","2022-0세 ㅅ15:45645"]}' 
 peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C market -n market -c '{"Args":["CreateAsset","Seller_User3","Seller_User3"," ","2","1201010","DONE","2022-아아아아아5645"]}' 
 peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C market -n market -c '{"Args":["CreateAsset","Seller_User1","Seller_User1"," ","3","123","DONE","202ㄹㅇㄴㅁㅇㄴㄹ"]}' 
 peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C market -n market -c '{"Args":["CreateAsset","sha123","Seller_User1","Buyer_User2","5","121233","DONE","22년"]}' 
 peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C market -n market -c '{"Args":["CreateAsset","sha12i31-20","Seller_User1","Buyer_User2","6","121323","DONE","20년"]}' 
 peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C market -n market -c '{"Args":["CreateAsset","sha0-0-1","Seller_User1","Buyer_User3","7","11233","DONE","24년"]}' 
#peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C market -n market -c '{"Args":["GetAllAssets"]}' 

# peer chaincode query -C market -n market -c '{"Args":["GetAllAssets"]}' 