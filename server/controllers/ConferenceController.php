<?php


namespace app\controllers;

use app\models\Conference;
use app\models\User;
use Yii;
use yii\rest\ActiveController;

class ConferenceController extends ActiveController
{
    public $modelClass = 'app\models\Conference';

    public function actionGetActive()
    {
        $access_token = Yii::$app->request->post('access_token');
        if(($user = User::findIdentityByAccessToken($access_token)) !== null){
            if(($model = Conference::findOne(['user_id' => $user->id])) !== null){
                return $model;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    public function actionSetVideo()
    {
        $conference = \Yii::$app->request->post('conference');
        $channel = \Yii::$app->request->post('channel');
        $pami = \Yii::$app->pami;
        $pami->initAmi();
        $message = $pami->setSingleVideoSrc($conference, $channel);
        $pami->closeAmi();
        return $message;
    }
}