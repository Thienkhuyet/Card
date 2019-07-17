<?php
require './JWT.php';
include './Database.php';
// required header
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$database= new Database();        
$con=$database->getConnection();
 $ac =$_GET['action'];
 if(isset($ac)){
    switch ($ac) {
        case 'add':
        {
            $vaitro=0;
$data = json_decode(file_get_contents("php://input"));
$query="INSERT INTO `diachi`(`Thanhpho`, `Quan`, `Thitran`, `Mota`) VALUES (?,?,?,?)";            
$stmt = $con->prepare( $query );
$stmt->bindParam(1, $data->Thanhpho);
$stmt->bindParam(2, $data->Quan);
$stmt->bindParam(3, $data->Thitran);
$stmt->bindParam(4, $data->Mota);
$stmt->execute();
$query="INSERT INTO `taikhoan`(`Ten`, `Matkhau`, `Vaitro`) VALUES (?,?,?)";
$stmt = $con->prepare( $query );
$stmt->bindParam(1, $data->Tendangnhap);
$stmt->bindParam(2, $data->Matkhau);
$stmt->bindParam(3, $vaitro);
$stmt->execute();
$query="INSERT INTO `khachang`(`Hoten`, `emial`, `ngaysinh`, `DC_id`, `TK_id`) VALUES (?,?,?,(SELECT max(ID) FROM diachi ),(SELECT max(TK_id) FROM taikhoan )) ";
$stmt = $con->prepare( $query );
$stmt->bindParam(1, $data->Hoten);
$stmt->bindParam(2, $data->Email);
$stmt->bindParam(3, $data->Ngaysinh);
$stmt->execute();
            echo json_encode($data);
            break;
        }
        case 'edit':{
    $headers = apache_request_headers();
  foreach ($headers as $header => $value) {
    if($header == "Authorization")
    {
      $tockens=  JWT::decode($value,'Minhvuong', array('HS256'));
      if($tockens->ketthuc>time()){// kiem tra tocken co het han khong
        $data = json_decode(file_get_contents("php://input"));

 

           echo json_encode(data);


      }else{
          echo json_encode(array("thongbao"=>"het han can dang nhap"));
      }

    }
  }
            break;
        }
        case 'list':{
             $headers = apache_request_headers();
  foreach ($headers as $header => $value) {
    if($header == "Authorization")
    {
      $tockens=  JWT::decode($value,'Minhvuong', array('HS256'));
      if($tockens->ketthuc>time()){// kiem tra tocken co het han khong
       // $data = json_decode(file_get_contents("php://input"));

   $query ="SELECT k.KH_id, k.Hoten, k.emial, k.ngaysinh, k.DC_id, k.TK_id, t.Ten, t.Matkhau FROM khachang k INNER JOIN taikhoan t ON k.TK_id=t.TK_id";
            $stmt = $con->prepare( $query );
            $stmt->execute();
              $row = $stmt->fetchAll();
            echo json_encode($row);

         //  echo json_encode(data);


      }else{
          echo json_encode(array("thongbao"=>"het han can dang nhap"));
      }

    }
  }
          
            break;
        }
        case 'delete':{
            
            break;
        }
        default: 
         echo json_encode(array("error"=>"Khonh dung dinh dang url","typeError"=>"404"));
    }

 }
