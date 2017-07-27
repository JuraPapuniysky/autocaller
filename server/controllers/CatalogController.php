<?php


namespace app\controllers;


use app\models\Catalog;
use app\models\User;
use yii\rest\ActiveController;

class CatalogController extends ActiveController
{
    public $modelClass = 'app\models\Catalog';


    /**
     * @return bool|static[]
     */
    public function actionCatalog()
    {
        $token = \Yii::$app->request->post('access_token');
        return $this->findCatalogs($token);
    }

    /**
     * @return Catalog|bool
     */
    public function actionAddCatalog()
    {
        $user = User::findIdentityByAccessToken(\Yii::$app->request->post('access_token'));
        if($user !== null){
            $model = new Catalog();
            $model->user_id = $user->id;
            $model->name = \Yii::$app->request->post('name');
            $model->number = \Yii::$app->request->post('number');
            if ($model->save()){
                return $model;
            }else{
                return false;
            }
        }
    }


    protected function findCatalogs($token)
    {
        $user = User::findIdentityByAccessToken($token);
        if($user !== null){
            return Catalog::findAll(['user_id' => $user->id]);
        }else{
            return false;
        }
    }
}