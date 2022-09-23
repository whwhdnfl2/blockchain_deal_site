#!/bin/bash

source scripts/utils.sh
. scripts/envVar.sh
. scripts/ccutils.sh

export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/

setGlobals buyer
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C people -n people -c '{"Args":["CreateAsset","Seller_User1","100","3000000","seller"]}' 
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C people -n people -c '{"Args":["CreateAsset","Seller_User2","20","56000000","seller"]}' 
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C people -n people -c '{"Args":["CreateAsset","Buyer_User1","5","100000000","buyer"]}' 
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C people -n people -c '{"Args":["CreateAsset","Buyer_User2","20","200000000","buyer"]}' 
#  peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C people -n people -c '{"Args":["ReadAsset","Seller_User1"]}' 
#  peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C people -n people -c '{"Args":["GetAssetHistory","Seller_User1"]}' 

setGlobals seller
#peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C people -n people -c '{"Args":["CreateAsset","asset2","fuck","5","25000","done"]}' 
# peer chaincode query -C people -n people -c '{"Args":["GetAllAssets"]}' 

setGlobals tax
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C revenue -n revenue -c '{"Args":["CreateAsset","TAX","asd","5"]}' 
 peer chaincode query -C revenue -n revenue -c '{"Args":["ReadAsset","TAX"]}' 

setGlobals koreapower
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C market -n market -c '{"Args":["CreateAsset","Seller_User1","Seller_User1"," ","5","3000","SALE","2022-04-2123:15:45645"]}' 
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C market -n market -c '{"Args":["CreateAsset","Seller_User2","Seller_User2"," ","7","25000","SALE","섹시 흥분 녹초 빨초 파초"]}' 
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C market -n market -c '{"Args":["CreateAsset","Seller_User1","Seller_User1"," Buyer_User1" ,"5","2000","DONE","1"]}' 
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C market -n market -c '{"Args":["CreateAsset","Seller_User2","Seller_User2"," Buyer_User1","7","3000","DONE","2"]}' 
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C market -n market -c '{"Args":["CreateAsset","Seller_User1","Seller_User1"," Buyer_User1","5","4000","DONE","23"]}' 
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C market -n market -c '{"Args":["CreateAsset","Seller_User2","Seller_User2"," Buyer_User1","7","25000","DONE","4"]}' 
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C market -n market -c '{"Args":["UpdateAsset","Seller_User1","셀러 수정 되는거냐 "," ",6","121323","SALE","20년"]}' 
# peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C market -n market -c '{"Args":["GetAllAssets"]}' 

# peer chaincode query -C market -n market -c '{"Args":["GetAllAssets"]}' 