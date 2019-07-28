<?php
require_once './JWT.php';
include './Database.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

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

$database = new Database();
$con = $database->getConnection();
$stmt = $con->prepare($sql);
$param = "%" . $search . "%";
$stmt->bindParam(1, $param);
//$stmt->bindParam(2, $start, PDO::PARAM_INT);
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
