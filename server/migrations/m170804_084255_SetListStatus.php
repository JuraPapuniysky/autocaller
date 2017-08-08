<?php

use yii\db\Migration;

class m170804_084255_SetListStatus extends Migration
{
    public function safeUp()
    {
        $this->addColumn('{{%list_name}}', 'status', $this->smallInteger()->defaultValue(\app\models\ListName::STATUS_PASSIVE));
    }

    public function safeDown()
    {
        echo "m170804_084255_SetListStatus cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m170804_084255_SetListStatus cannot be reverted.\n";

        return false;
    }
    */
}
