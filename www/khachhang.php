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
        $Hoatdong=1;
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
        $stmt->bindParam(3, $vaitro, PDO::PARAM_INT);
        $stmt->bindParam(4, $Hoatdong,PDO::PARAM_INT);
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
                $query = "UPDATE `taikhoan` SET  Hoatdong=? WHERE TK_id=?";
                $stmt = $con->prepare($query);
              //  $stmt->bindParam(1, $data->Tendangnhap);
                //$stmt->bindParam(2, $data->Matkhau);
                $stmt->bindParam(1,$data->Hoatdong,PDO::PARAM_INT);
                $stmt->bindParam(2, $data->TK_id);
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
            
$sort = $_GET['sort'];
$typeSort = $_GET['order'];
$page = $_GET['page'];
$size = $_GET['size'];
$search = $_GET['search'];


$start = ($page - 1) * $size;
$sql = 
"SELECT
count(KH_id) as sumColumn
FROM khachang k , taikhoan t, diachi d WHERE k.TK_id=t.TK_id and k.DC_id=d.ID 
AND  k.Hoten LIKE ?";

$stmt = $con->prepare($sql);
$param = "%" . $search . "%";
$stmt->bindParam(1, $param);
$stmt->setFetchMode(PDO::FETCH_ASSOC);
$stmt->execute();
$resultSet = $stmt->fetchAll();
$list = array('total_column' => $resultSet[0]['sumColumn'], 'data' => []);

$sqldata = "SELECT
 k.KH_id, k.Hoten, k.Email, k.Ngaysinh,k.SDT, k.DC_id, k.TK_id, t.Ten,
  t.Matkhau,t.Hoatdong,d.Tinh,d.Huyen,d.Xa,d.Mota
FROM khachang k , taikhoan t, diachi d WHERE k.TK_id=t.TK_id and k.DC_id=d.ID 
AND  k.Hoten LIKE ? ORDER BY " . $sort . " " . $typeSort . " LIMIT ?," . $size;

//echo $sqldata;

$stmt = $con->prepare($sqldata);
$param = "%" . $search . "%";
$stmt->bindParam(1, $param);
$stmt->bindParam(2, $start, PDO::PARAM_INT);
//$stmt->bindParam(3, $size,PDO::PARAM_INT);

$stmt->setFetchMode(PDO::FETCH_ASSOC);
$stmt->execute();
$resultSet = $stmt->fetchAll();
$list['data'] = $resultSet;
echo json_encode($list);

            } else {
              echo json_encode(array("thongbao" => "het han can dang nhap"));
            }
          }
        
        }
          break;
      }



    case 'checkDuplicate': {
      $data = json_decode(file_get_contents("php://input"));
      $sql = "SELECT Ten FROM taikhoan WHERE Ten =?";
     // echo json_encode($data);
      $stmt=$con->prepare($sql);
       $stmt->bindParam(1,$data->username);
       $stmt->execute();
       $num=$stmt->rowCount();
       if($num==0){
        echo json_encode(array("status"=>true));
       }else {
         echo json_encode(array("status"=>false));
       }

        break;
      }
    default:
      echo json_encode(array("error" => "Khonh dung dinh dang url", "typeError" => "404"));
  }
}
