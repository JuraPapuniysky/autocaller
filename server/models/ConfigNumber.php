<?php


namespace app\models;

use Yii;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "config_number"
 * @property integer $id
 * @property integer $list_name_id
 * @property integer $catalog_id
 * @property integer $microphone
 * @property integer $created_at
 * @property integer $updated_at
 *
 * @property ListName $listName
 * @property Catalog $catalog
 */
class ConfigNumber extends ActiveRecord
{
    const MICROPHONE_OFF = 0;
    const MICROPHONE_ON = 1;

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'config_number';
    }

    public function behaviors()
    {
        return [
            TimestampBehavior::className(),
        ];
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['list_name_id', 'catalog_id', 'updated_at', 'created_at'], 'integer'],
            [['list_name_id'],
                'exist',
                'skipOnError' => true,
                'targetClass' => ListName::className(),
                'targetAttribute' => ['list_name_id' => 'id']],
            [['catalog_id'],
                'exist',
                'skipOnError' => true,
                'targetClass' => Catalog::className(),
                'targetAttribute' => ['catalog_id' => 'id']],
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getListName()
    {
        return $this->hasOne(ListName::className(), ['id' => 'list_name_id']);
    }

    public function getCatalog()
    {
        return $this->hasOne(Catalog::className(), ['id' => 'catalog_id']);
    }

}