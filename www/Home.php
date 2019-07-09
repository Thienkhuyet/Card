<?php
require_once './JWT.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



//$data = json_decode(file_get_contents("php://input"));
//if(isset($data)){
//$username = $data->username;
//$password = $data->password;
//}
$headers = apache_request_headers();
foreach ($headers as $header => $value) {
    if($header == "Authorization")
    {
      $tockens=  JWT::decode($value,'Minhvuong', array('HS256'));
      if($tockens->ketthuc>time()){
           echo json_encode(array("thongbao"=>"thanh cong"));
      }else{
          echo json_encode(array("thongbao"=>"het han can dang nhap"));
      }

    }
}
//echo $headers->Host;
//if(isset($headers))
//echo json_encode($headers);
//else echo json_encode (array("thông báo"=>"loi khong co bao mat"));
//foreach ($headers as $header => $value) {
//    echo "$header: $value <br />\n";
//}
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

