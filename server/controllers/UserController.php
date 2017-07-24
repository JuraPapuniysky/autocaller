<?php
namespace app\controllers;

use app\models\CreateUser;
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

        $actions['index']['prepareDataProvider'] = [$this, 'indexDataProvider'];


        return $actions;
    }

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator']['class'] = HttpBearerAuth::className();
        $behaviors['authenticator']['except'] = ['authenticate', 'index'];
        return $behaviors;
    }


    public function checkAccess($action, $model = null, $params = [])
    {
        if($action != 'index') {
            if (!User::findIdentity(\Yii::$app->user->id)->isAdmin()) {
                throw new ForbiddenHttpException(sprintf('You do not have permissions!', $action));
            }
        }
    }

    public function indexDataProvider()
    {
        return User::find()->all();
    }

    public function prepareDataProvider()
    {
        return \Yii::$app->request->get();
    }


    /**
     * @return string
     */
    public function actionAuthenticate()
    {
        $username =  \Yii::$app->request->post('username');
        $password = \Yii::$app->request->post('password');

        $user = User::findByUsername($username);
        if (!$user || !$user->validatePassword($password)) {
            return 'Incorrect username or password.';
        }else{
            return ['access_token' => $user->access_token];
        }

    }

}

