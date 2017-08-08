<?php

use yii\db\Migration;

class m170808_072317_config_num extends Migration
{
    public function safeUp()
    {
        $this->createTable('{{%config_number}}', [
            'id' => $this->primaryKey(),
            'list_name_id' => $this->integer(),
            'catalog_id' => $this->integer(),
            'microphone' => $this->smallInteger()->defaultValue(0),
            'created_at' => $this->integer(),
            'updated_at' => $this->integer(),
        ]);

        $this->createIndex('FK_CONFIG_NUMBER_LIST_NAME', '{{%config_number}}', 'list_name_id');
        $this->addForeignKey('FK_CONFIG_NUMBER_LIST_NAME', '{{%config_number}}', 'list_name_id', '{{%list_name}}', 'id');

        $this->createIndex('FK_CONFIG_NUMBER_CATALOG', '{{%config_number}}', 'catalog_id');
        $this->addForeignKey('FK_CONFIG_NUMBER_CATALOG', '{{%config_number}}', 'catalog_id', '{{%catalog}}', 'id');
    }

    public function safeDown()
    {
        echo "m170808_072317_config_num cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m170808_072317_config_num cannot be reverted.\n";

        return false;
    }
    */
}
