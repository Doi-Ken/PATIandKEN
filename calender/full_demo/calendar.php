<?php 
  session_start(); 
  if(!isset($_SESSION['calendar'])){
    $_SESSION['calendar']=array( 
    'ids'=>0, 
  ); 
}
if(isset($_REQUEST['action'])){ 
  switch($_REQUEST['action']){ 
    case 'save': // { 
      $start_date=(int)$_REQUEST['start']; 
      $data=array( 
        'title'=>(isset($_REQUEST['title'])?$_REQUEST['title']:''), 
        'body' =>(isset($_REQUEST['body'])?$_REQUEST['body']:''), 
        'start'=>date('c',$start_date), 
        'end'  =>date('c',(int)$_REQUEST['end']) 
      ); 
      $id=(int)$_REQUEST['id']; 
      if($id && isset($_SESSION['calendar'][$id])){ 
        $_SESSION['calendar'][$id]=$data; 
      }  
      else{ 
        $id= ++$_SESSION['calendar']['ids']; 
        $_SESSION['calendar'][$id]=$data; 
      }  
      echo 1; 
      exit; 
 // } 
  } 
} 
?>