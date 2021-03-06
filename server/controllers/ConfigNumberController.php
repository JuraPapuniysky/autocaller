<?php


namespace app\controllers;


use app\models\ConfigNumber;
use app\models\ListName;
use yii\base\ErrorException;
use yii\httpclient\Client;
use yii\rest\ActiveController;

class ConfigNumberController extends ActiveController
{
  public $modelClass = 'app/models/ConfigNumber';


  /**
   * @return ConfigNumber[]
   */
  public function actionConfigNumbers()
  {
    $list_name_id = \Yii::$app->request->post('list_name_id');

    if (($configNumbers = self::findConfigNumbers($list_name_id)) === null) {
      if (($listName = ListName::findOne($list_name_id)) !== null) {
        foreach ($listName->listPhones as $listPhone) {
          $configNumber = new ConfigNumber();
          $configNumber->list_name_id = $list_name_id;
          $configNumber->catalog_id = $listPhone->catalog->id;
          $configNumber->save();
        }
      }
    }

    return $configNumbers;
  }


  /**
   * @return ConfigNumber
   */
  public function actionConfigNumber()
  {
    $config_number_id = \Yii::$app->request->post('config_number_id');
    $catalog_id = \Yii::$app->request->post('catalog_id');

    $configNumber = ConfigNumber::findOne(['id' => $config_number_id, 'catalog_id' => $catalog_id]);
    if ($configNumber !== null) {
      if ($configNumber->microphone == ConfigNumber::MICROPHONE_OFF) {
        $configNumber->microphone = ConfigNumber::MICROPHONE_ON;
        $configNumber->save();
      } else {
        $configNumber->microphone = ConfigNumber::MICROPHONE_OFF;
        $configNumber->save();
      }
      return $configNumber;
    } else {
      return false;
    }
  }

  public function actionConlimit()
  {
    try {

      $client = new Client();
      $response = $client->createRequest()
        ->setMethod('GET')
        ->setUrl('http://asutp-ssrem:8088')
        ->send();
      $response = str_replace("\n", "", $response->content);
      $response = str_replace("\r", "", $response);
      $response = str_replace("{", "", $response);
      $response = str_replace("}", "", $response);

      $response = str_replace("\"", " ", $response);
      $response = explode(' ', $response);
      $fact = explode(',', $response[5]);
      $data = ['data' => [
        'plan' => $response[2],
        'fact' => $fact[0] . ',' . $fact[1]{0} . $fact[1]{1},
      ]];
      return $data;

    } catch (ErrorException $e) {

      return ['data' => [
        'plan' => '0',
        'fact' =>'0',
        'error' => $e,
      ]];
    }
  }

  protected static function findConfigNumbers($list_name_id)
  {
    if (($configNumbers = ConfigNumber::findOne(['list_name_id' => $list_name_id])) !== null) {
      return $configNumbers;
    }
  }
}
