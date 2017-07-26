<?php
/**
 * Created by PhpStorm.
 * User: wsst17
 * Date: 26.07.17
 * Time: 9:03
 */

namespace app\controllers;


use yii\rest\ActiveController;

class CatalogController extends ActiveController
{
    public $modelClass = 'app\models\Catalog';
}