<?php

use yii\db\Migration;

class m170720_100252_rename_list extends Migration
{
    public function safeUp()
    {
        $this->renameTable('{{%list}}', '{{%list_phone}}');
    }

    public function safeDown()
    {
        echo "m170720_100252_rename_list cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m170720_100252_rename_list cannot be reverted.\n";

        return false;
    }
    */
}
