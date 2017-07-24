<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Cache-Control, Pragma, Origin,Authorization, Content-Type, X-Requested-With, loginToken");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");

// comment out the following two lines when deployed to production
defined('YII_DEBUG') or define('YII_DEBUG', true);
defined('YII_ENV') or define('YII_ENV', 'dev');

require(__DIR__ . '/../vendor/autoload.php');
require(__DIR__ . '/../vendor/yiisoft/yii2/Yii.php');

$config = require(__DIR__ . '/../config/web.php');

(new yii\web\Application($config))->run();
