<?php
namespace app\controllers;

use app\models\User;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;
use yii\web\ForbiddenHttpException;

class UserController extends ActiveController
{
    public $modelClass = 'app\models\User';

    public function actions()
    {
        $actions = parent::actions();

        //$actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];


        return $actions;
    }

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator']['class'] = HttpBearerAuth::className();
        return $behaviors;
    }

    public function checkAccess($action, $model = null, $params = [])
    {
        if (!User::findIdentity(\Yii::$app->user->id)->isAdmin){
            throw new ForbiddenHttpException(sprintf('You do not have permissions!', $action));
        }
    }

}

