<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "list_phone".
 *
 * @property integer $id
 * @property integer $user_id
 * @property integer $list_name_id
 * @property integer $catalog_id
 * @property integer $status
 * @property integer $updated_at
 * @property integer $created_at
 *
 * @property Catalog $catalog
 * @property ListName $listName
 * @property User $user
 */
class ListPhone extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'list_phone';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['user_id', 'list_name_id', 'catalog_id', 'status', 'updated_at', 'created_at'], 'integer'],
            [['catalog_id'], 'exist', 'skipOnError' => true, 'targetClass' => Catalog::className(), 'targetAttribute' => ['catalog_id' => 'id']],
            [['list_name_id'], 'exist', 'skipOnError' => true, 'targetClass' => ListName::className(), 'targetAttribute' => ['list_name_id' => 'id']],
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
            'list_name_id' => 'List Name ID',
            'catalog_id' => 'Catalog ID',
            'status' => 'Status',
            'updated_at' => 'Updated At',
            'created_at' => 'Created At',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCatalog()
    {
        return $this->hasOne(Catalog::className(), ['id' => 'catalog_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getListName()
    {
        return $this->hasOne(ListName::className(), ['id' => 'list_name_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::className(), ['id' => 'user_id']);
    }
}
