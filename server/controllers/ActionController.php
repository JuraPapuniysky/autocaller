<?php


namespace app\controllers;


use yii\rest\ActiveController;

class ActionController extends ActiveController
{
    public function actionSetVideo()
    {
        //$conference = \Yii::$app->request->post('conference');
        //$channel = \Yii::$app->request->post('channel');
        //$pami = \Yii::$app->pami;
        //$pami->initAmi();
        //$message = $pami->setSingleVodeoSrc($conference, $channel);
        //$pami->closeAmi();
        //return $message;
        return 'success';
    }
}