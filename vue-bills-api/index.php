<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__ . '/vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$app = new Silex\Application();

function getBills($type = 'pay')
{

    $json = file_get_contents(__DIR__ . '/bills.'.$type.'.json');
    $data = json_decode($json, true);
    return $data['bills'];
}

function findIndexById($id, $type = 'pay')
{
    $bills = getBills($type);
    foreach ($bills as $key => $bill) {
        if ($bill['id'] == $id) {
            return $key;
        }
    }
    return false;
}

function writeBills($bills, $type = 'pay')
{
    $data = ['bills' => $bills];
    $json = json_encode($data);
    file_put_contents(__DIR__ . '/bills.'.$type.'.json', $json);
}

$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

// Inicio Rotas PAY
$app->get('api/pay/bills', function () use ($app) {
    $bills = getBills();
    return $app->json($bills);
});

$app->get('api/pay/bills/total', function () use ($app) {
    $bills = getBills();
    $sum=0;
    foreach ($bills as $value) {
        $sum += (float)$value['value'];
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/pay/bills/{id}', function ($id) use ($app) {
    $bills = getBills();
    $bill = $bills[findIndexById($id)];
    return $app->json($bill);
});

$app->post('api/pay/bills', function (Request $request) use ($app) {
    $bills = getBills();
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $bills[] = $data;
    writeBills($bills);
    return $app->json($data);
});

$app->put('api/pay/bills/{id}', function (Request $request, $id) use ($app) {
    $bills = getBills();
    $data = $request->request->all();
    $index = findIndexById($id);
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBills($bills);
    return $app->json($bills[$index]);
});

$app->delete('api/pay/bills/{id}', function ($id) {
    $bills = getBills();
    $index = findIndexById($id);
    array_splice($bills,$index,1);
    writeBills($bills);
    return new Response("", 204);
});
// Fim Rotas PAY

// Inicio Rotas receive
$app->get('api/receive/bills', function () use ($app) {
    $bills = getBills('receive');
    return $app->json($bills);
});

$app->get('api/receive/bills/total', function () use ($app) {
    $bills = getBills('receive');
    $sum=0;
    foreach ($bills as $value) {
        $sum += (float)$value['value'];
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/receive/bills/{id}', function ($id) use ($app) {
    $bills = getBills('receive');
    $bill = $bills[findIndexById($id,'receive')];
    return $app->json($bill);
});

$app->post('api/receive/bills', function (Request $request) use ($app) {
    $bills = getBills('receive');
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $bills[] = $data;
    writeBills($bills,'receive');
    return $app->json($data);
});

$app->put('api/receive/bills/{id}', function (Request $request, $id) use ($app) {
    $bills = getBills('receive');
    $data = $request->request->all();
    $index = findIndexById($id,'receive');
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBills($bills,'receive');
    return $app->json($bills[$index]);
});

$app->delete('api/receive/bills/{id}', function ($id) {
    $bills = getBills('receive');
    $index = findIndexById($id,'receive');
    array_splice($bills,$index,1);
    writeBills($bills,'receive');
    return new Response("", 204);
});

// Fim Rotas receive

$app->match("{uri}", function($uri){
    return "OK";
})
->assert('uri', '.*')
->method("OPTIONS");


$app->run();
