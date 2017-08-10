<?php

$params = require(__DIR__ . '/params.php');
$db = require(__DIR__ . '/database.php');

$config = [
    'id' => 'basic',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'components' => [
        'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'cookieValidationKey' => 'TLfaaHWxZVo6DxZntNrtYwMgHiKYP3e9',
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ],
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'user' => [
            'identityClass' => 'app\models\User',
            'enableAutoLogin' => true,
            'enableSession' => false,
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            // send all mails to a file by default. You have to set
            // 'useFileTransport' to false and configure a transport
            // for the mailer to send real emails.
            'useFileTransport' => true,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db' => $db,
        'urlManager' => [
            'enablePrettyUrl' => true,
            'enableStrictParsing' => true,
            'showScriptName' => false,
            'rules' => [
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'user',
                    'extraPatterns' => [
                        'POST create-user' => 'create-user',
                        'POST authenticate' => 'authenticate',
                        'OPTIONS get-users' => 'get-users',
                        'POST user' => 'user',
                    ]
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'catalog',
                    'extraPatterns' => [
                        'POST catalog' => 'catalog',
                        'POST add-catalog' => 'add-catalog',
                        'POST search' => 'search',
                        'POST delete-number' => 'delete-number',
                        'POST update-number' => 'update-number',
                    ]
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'list',
                    'extraPatterns' => [
                        'POST lists' => 'lists',
                        'POST add-list' => 'add-list',
                        'POST delete-list' => 'delete-list',
                        'POST update-list' => 'update-list',
                        'POST list-catalog' => 'list-catalog',
                        'POST add-num' => 'add-num',
                        'POST delete-num' => 'delete-num',
                        'POST active-list' => 'active-list',
                    ]
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'config-number',
                    'extraPatterns' => [
                        'POST config-number' => 'config-number',
                    ]
                ],
            ],
        ]
    ],
    'params' => $params,
];

if (YII_ENV_DEV) {
    // configuration adjustments for 'dev' environment
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];

    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];
}

return $config;
