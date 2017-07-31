<?php

namespace app\controllers;

use yii\rest\ActiveController;
use app\models\User;
use app\models\ListName;
use app\models\ListPhone;

class ListController extends ActiveController{

    public $modelClass = 'app\models\ListName';

    public function actionLists()
    {
        $user = User::findIdentityByAccessToken(\Yii::$app->request->post('access_token'));
        if ($user != null){
            if (($model = ListName::findAll(['user_id' => $user->id])) !== null){
                return $model;
            }else{
                return false;
            }
        }
    }

    public function actionAddList()
    {
        $user = User::findIdentityByAccessToken(\Yii::$app->request->post('access_token'));
        if ($user != null){
            $list = new ListName();
            $list->name = \Yii::$app->request->post('name');
            $list->user_id = $user->id;
            if ($list->save()){
                return ListName::find()->all();
            }else{
                return false;
            }
        }
    }

    public function actionUpdateList()
    {
        $user = User::findIdentityByAccessToken(\Yii::$app->request->post('access_token'));
        if ($user != null){
             if (($model = ListName::findOne(\Yii::$app->request->post('id'))) !== null){
                $model->name = \Yii::$app->request->post('name');
                if ($model->save()){
                    return ListName::find()->all();
                }
            }else{
                return false;
            }
        }
    }

    public function actionDeleteList()
    {
        $user = User::findIdentityByAccessToken(\Yii::$app->request->post('access_token'));
        if ($user != null){
             if (($model = ListName::findOne(\Yii::$app->request->post('list_id'))) !== null){
                $model->delete();
                return ListName::find()->all();
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    public function actionListCatalog()
    {
        $user = User::findIdentityByAccessToken(\Yii::$app->request->post('access_token'));
        $list_name_id = \Yii::$app->request->post('list_id');
        if ($user != null){
            $listPhones = ListPhone::findAll(['list_name_id' => $list_name_id]);
            $phones = [];
            foreach ($listPhones as $listPhone){
                $tmp = ['number' => $listPhone->catalog->number, 'name' => $listPhone->catalog->name];
                array_push($phones, $tmp);
            }
            return $phones;
        }else{
            return false;
        }
    }

    public function actionAddNum()
    {
        $user = User::findIdentityByAccessToken(\Yii::$app->request->post('access_token'));
        $list_name_id = \Yii::$app->request->post('list_id');
        if ($user != null){
            $listPhone = new ListPhone();
            $listPhone->user_id = $user->id;
            $listPhone->list_name_id = $list_name_id;
            $listPhone->catalog_id = \Yii::$app->request->post('catalog_id');
            $phones = [];
            if ($listPhone->save()){
                foreach (ListPhone::findAll(['list_name_id' => $list_name_id]) as $listPhone){
                    $tmp = ['number' => $listPhone->catalog->number, 'name' => $listPhone->catalog->name];
                    array_push($phones, $tmp);
                }
            }
            return $phones;
        }else{
            return false;
        }
    }

    public function actionDeleteNum()
    {

    }
}