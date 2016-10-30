<?php
$host="http://patiandken.s3-website-ap-northeast-1.amazonaws.com:3306";
$db_user="dbuser";
$db_pass="domdomdom";
$db_name="dbken";
$timezone="Asia/Tokyo";

$link=mysql_connect($host,$db_user,$db_pass);
mysql_select_db($db_name,$link);
mysql_query("SET names UTF8");

header("Content-Type: text/html; charset=utf-8");
date_default_timezone_set($timezone); 
?>
