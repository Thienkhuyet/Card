<?php
require './JWT.php';

// required header
header("Access-Control-Allow-Origin: http://localhost:4200/**");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 

$tocken=array();
$tocken['id']='12';
$tocken['username']="thieuAm";
$tocken['password']="123456";


$jsontocken = JWT::encode($tocken, "minhvuong");
$dalogin =JWT::decode($jsontocken, 'minhvuong', array('HS256'));
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
echo JWT::jsonEncode(array("tocken"=>$jsontocken));
echo JWT::jsonEncode($dalogin);
//echo $dalogin;
