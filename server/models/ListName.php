<?php

namespace app\models;

use Yii;
use yii\behaviors\TimestampBehavior;

/**
 * This is the model class for table "list_name".
 *
 * @property integer $id
 * @property integer $user_id
 * @property string $name
 * @property integer $status
 * @property integer $updated_at
 * @property integer $created_at
 *
 * @property User $user
 * @property ListPhone[] $listPhones
 */
class ListName extends \yii\db\ActiveRecord
{

    const STATUS_ACTIVE = 1;
    const STATUS_PASSIVE = 0;
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'list_name';
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
            [['user_id', 'updated_at', 'created_at', 'status'], 'integer'],
            [['name'], 'string', 'max' => 32],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['user_id' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'name' => 'Name',
            'updated_at' => 'Updated At',
            'created_at' => 'Created At',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::className(), ['id' => 'user_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getListPhones()
    {
        return $this->hasMany(ListPhone::className(), ['list_name_id' => 'id']);
    }
}
