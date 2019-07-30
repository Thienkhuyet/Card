<?php
include_once './Database.php';
header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$databaseService = new Database();
$con = $databaseService->getConnection();

//$data = json_decode(file_get_contents("php://input"));
$id_kh=$_GET['khang'];
$sql="select ct.Ten_SP, ct.Gia*ct.Soluong as Gia from khachang kh , donhang dh, chitiet_sanpham ct WHERE kh.KH_id = ? AND ct.DH_id=dh.DH_id AND kh.KH_id=dh.KH_id";
$stmt=$con->prepare($sql);
$stmt->bindParam(1, $id_kh,PDO::PARAM_INT);
$stmt->setFetchMode(PDO::FETCH_ASSOC);
$stmt->execute();




if($stmt->execute()){

    http_response_code(200);
    $resultSet = $stmt->fetchAll();
    echo json_encode($resultSet);
 //   echo json_encode(array("message" => "User was successfully registered."));
}
else{
    http_response_code(400);

    echo json_encode(array("message" => "Unable to register the user."));
}
?>