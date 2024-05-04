<?php

header("Access-Control-Allow-Origin: *");
if ($_SERVER['HTTP_ORIGIN']) {
    // header("Access-Control-Allow-Origin: https://item.taobao.com");
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header("Content-Language: vi");

// Hàm xử lý yêu cầu và phản hồi
function handleRequest()
{
    // Kiểm tra yêu cầu OPTIONS và phản hồi ngay lập tức
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit;
    }
    // Bắt đầu session
    session_start([
        'name' => 'vtexpress'
    ]);
    // Xử lý các yêu cầu khác
    switch ($_SERVER['PATH_INFO']) {
        case '/api/login':
            handleLogin();
            break;
        case '/api/get-auth':
            handleGetAuth();
            break;
        case '/api/order':
            handleOrder();
            break;
        case '/dat-hang/add':
            handleOrder();
            break;
        default:
            // Nếu không khớp với bất kỳ đường dẫn nào, trả về lỗi 404
            http_response_code(404);
            echo json_encode(["message" => "Not found"]);
    }
}

// Hàm xử lý yêu cầu đăng nhập
function handleLogin()
{
    header("Content-Type: application/json");

    $username = $_REQUEST['username'];
    $password = $_REQUEST['password'];

    if ($username === 'datlx' && $password === 'datlx123') {
        $_SESSION['user']['user_id'] = $username;
        $_SESSION['user']['password'] = $username;
        $_SESSION['user']['fullname'] = "Luu Xuan Dat";

        $auth = json_encode([
            'user' => $_SESSION['user'],
            'ti-gia' => 3456,
        ]);

        setcookie("vtexpress", session_id(), [
            'expires' => time() + 3600,
            'path' => '/api',
            'httponly' => true,
            'samesite' => 'None',
            'secure' => 1
        ]);

        echo $auth;
    } else {
        http_response_code(422);
        echo json_encode([
            'msg' => 'username or password invalid'
        ]);
    }
}

function handleGetAuth()
{
    header("Content-Type: application/json");
    echo json_encode([
        'user' => $_SESSION['user'] ?? null
    ]);
}

function handleOrder()
{
    // Kiểm tra xác thực
    if (!isset($_SESSION['user'])) {
        // header('HTTP/1.1 401 Unauthorized');
        echo json_encode(["message" => "Bạn chưa đăng nhập!"]);
        // exit;
    }

    header("Content-Type: application/json");
    echo json_encode([
        'msg' => 'Xin cảm ơn bạn đã order'
    ]);
}

// Gọi hàm xử lý yêu cầu và phản hồi
handleRequest();
