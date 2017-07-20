<?php

use yii\db\Migration;

class m170720_094919_index_catalog extends Migration
{
    public function safeUp()
    {
        $this->createIndex('FK_user_catalog', '{{%catalog}}', 'user_id');
        $this->addForeignKey('FK_user_catalog', '{{%catalog}}', 'user_id', 'user', 'id');
    }

    public function safeDown()
    {
        echo "m170720_094919_index_catalog cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m170720_094919_index_catalog cannot be reverted.\n";

        return false;
    }
    */
}
