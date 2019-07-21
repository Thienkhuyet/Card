<?php
require './JWT.php';
include './Database.php';
// required header
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$database = new Database();
$con = $database->getConnection();
$ac = $_GET['action'];
if (isset($ac)) {
  switch ($ac) {
    case 'add': {
        $vaitro = 0;
        $data = json_decode(file_get_contents("php://input"));
        $query = "INSERT INTO `diachi`(`Tinh`, `Huyen`, `Xa`, `Mota`) VALUES (?,?,?,?)";
        $stmt = $con->prepare($query);
        $stmt->bindParam(1, $data->Tinh);
        $stmt->bindParam(2, $data->Huyen);
        $stmt->bindParam(3, $data->Xa);
        $stmt->bindParam(4, $data->Mota);
        $stmt->execute();
        $query = "INSERT INTO `taikhoan`(`Ten`, `Matkhau`, `Vaitro`,`Hoatdong`) VALUES (?,?,?,?)";
        $stmt = $con->prepare($query);
        $stmt->bindParam(1, $data->Tendangnhap);
        $stmt->bindParam(2, $data->Matkhau);
        $stmt->bindParam(3, $vaitro);
        $stmt->bindParam(4, $data->Hoatdong);
        $stmt->execute();

        $query = "INSERT INTO khachang(Hoten , Email, Ngaysinh,SDT, DC_id, TK_id) VALUES (?,?,?,?,(SELECT max(ID) FROM diachi ),(SELECT max(TK_id) FROM taikhoan )) ";
        $stmt = $con->prepare($query);
        $stmt->bindParam(1, $data->Hoten);
        $stmt->bindParam(2, $data->Email);
        $stmt->bindParam(3, $data->Ngaysinh);
        $stmt->bindParam(4, $data->SDT);
        $stmt->execute();
        echo json_encode($data);
        break;
      }
    case 'edit': {
        $headers = apache_request_headers();
        foreach ($headers as $header => $value) {
          if ($header == "Authorization") {

            $tockens =  JWT::decode($value, 'Minhvuong', array('HS256'));
            if ($tockens->ketthuc > time()) { // kiem tra tocken co het han khong
          
                $data = json_decode(file_get_contents("php://input"));

                $query = "UPDATE `diachi` SET Tinh=?, Huyen=?, Xa=?, Mota=? WHERE ID=?";
                $stmt = $con->prepare($query);
                $stmt->bindParam(1, $data->Tinh);
                $stmt->bindParam(2, $data->Huyen);
                $stmt->bindParam(3, $data->Xa);
                $stmt->bindParam(4, $data->Mota);
                $stmt->bindParam(5, $data->DC_id);
                $stmt->execute();
                $query = "UPDATE `taikhoan` SET Ten=?, Matkhau=?, Hoatdong=? WHERE TK_id=?";
                $stmt = $con->prepare($query);
                $stmt->bindParam(1, $data->Tendangnhap);
                $stmt->bindParam(2, $data->Matkhau);
                $stmt->bindParam(3,$data->Hoatdong);
                $stmt->bindParam(4, $data->TK_id);
                $stmt->execute();
                $query = "UPDATE `khachang` SET Hoten=?, Email=?, SDT=?, Ngaysinh=? WHERE KH_id=?";
                $stmt = $con->prepare($query);
                $stmt->bindParam(1, $data->Hoten);
                $stmt->bindParam(2, $data->Email);
                $stmt->bindParam(3, $data->SDT);
                $stmt->bindParam(4, $data->Ngaysinh);
                $stmt->bindParam(5, $data->KH_id);

                $stmt->execute();
                echo json_encode($data);

              }
            }
          }
        
        break;
      }
    case 'list': {
        $headers = apache_request_headers();
        foreach ($headers as $header => $value) {
          if ($header == "Authorization") {
            $tockens =  JWT::decode($value, 'Minhvuong', array('HS256'));
            if ($tockens->ketthuc > time()) { // kiem tra tocken co het han khong
             // $data = json_decode(file_get_contents("php://input"));

              $query = "SELECT k.KH_id, k.Hoten, k.Email, k.Ngaysinh,k.SDT, k.DC_id, k.TK_id, t.Ten, t.Matkhau,t.Hoatdong,d.Tinh,d.Huyen,d.Xa,d.Mota
               FROM khachang k , taikhoan t, diachi d WHERE k.TK_id=t.TK_id and k.DC_id=d.ID ";

              $stmt = $con->prepare($query);
              $stmt->setFetchMode(PDO::FETCH_ASSOC);
              $stmt->execute();
              $resultSet = $stmt->fetchAll();
              echo json_encode($resultSet);
            } else {
              echo json_encode(array("thongbao" => "het han can dang nhap"));
            }
          }
        
        }
          break;
      }



    case 'delete': {

        break;
      }
    default:
      echo json_encode(array("error" => "Khonh dung dinh dang url", "typeError" => "404"));
  }
}
