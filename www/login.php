<?php
include_once './Database.php';
require_once './JWT.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$databaseService = new Database();
$conn = $databaseService->getConnection();
$username = '';
$password = '';


$data = json_decode(file_get_contents("php://input"));
if(isset($data)){
$username = $data->username;
$password = $data->password;
}
$table_name = 'taikhoan';

$query = "SELECT TK_id,Ten,Matkhau ,Vaitro FROM " . $table_name . " WHERE Ten = ? LIMIT 0,1";

$stmt = $conn->prepare( $query );
$stmt->bindParam(1, $username);
$stmt->execute();
$num = $stmt->rowCount();

if($num > 0){
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $id = $row['TK_id'];
    $username2 = $row['Ten'];
    $active = $row['Vaitro'];
    $password2 = $row['Matkhau'];
  //  $hoatdong= $row['Hoatdong'];

    if($password == $password2 )
    {
        $secret_key = "Minhvuong";
        // key jwt
        $issuer_claim = "THE_ISSUER"; // this can be the servername
        $audience_claim = "THE_AUDIENCE";
        $issuedat_claim = time(); // issued at
        $notbefore_claim = $issuedat_claim + 10; //not before in seconds
        $expire_claim = $issuedat_claim + 60*60*24; // expire time in seconds
        $token = array(
            "iss" => $issuer_claim,
            "aud" => $audience_claim,
            "iat" => $issuedat_claim,
            "batdau" => $notbefore_claim,
            "ketthuc" => $expire_claim,
            "data" => array(
                "id" => $id,
                "username" => $username2,
                "hoatdong" => $active,
        ));


        $jwt = JWT::encode($token, $secret_key);
        echo json_encode(
            array(
                "message" => "Successful login.",
                "jwt" => $jwt,
                "expireAt" => $expire_claim
            ));
    }
    else{

       // http_response_code(401);
        echo json_encode(array("message" => "Login failed.", "password" => $password, "pass"=>$password2));
    }
}
?>


