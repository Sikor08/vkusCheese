<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$telephone = $_POST['phone'];
$goods = json_decode($_POST['arrayGoods'], true);
// $email = $_POST['email'];
// $text = $_POST['texta'];
// $file = $_FILES['file'];

$goodsList = "<ul>";
foreach($goods as $item) {
    $id = $item['id'];
    $price = $item['price'];
    $quantity = $item['quantity'];
    $goodsList .= "<li>ID: $id, Цена: $price, Количество: $quantity</li>";
}
$goodsList .= "</ul>";


// Формирование самого письма
$title = "Заголовок письма";
$body = "
<h2>Новое письмо</h2>
<b>Имя:$name</b> <br>
<b>телефон: $telephone</b> <br><br>
<b>Товары:</b><br>$goodsList
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
    $mail->Username   = 'sikor08'; // Логин на почте
    $mail->Password   = 'smvvnxamtcmmtsvw'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('sikor08@gmail.com', 'Vkusgurmana'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('sikor08@gmail.com');  
    // $mail->addAddress('sikor@yandex.ru'); // Ещё один, если нужен

    // Прикрипление файлов к письму
if (!empty($file['name'][0])) {
    for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
        $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
        $filename = $file['name'][$ct];
        if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
            $mail->addAttachment($uploadfile, $filename);
            $rfile[] = "Файл $filename прикреплён";
        } else {
            $rfile[] = "Не удалось прикрепить файл $filename";
        }
    }   
}
// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);
?>