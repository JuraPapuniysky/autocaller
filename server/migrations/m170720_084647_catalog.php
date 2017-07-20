<?php

use yii\db\Migration;

class m170720_084647_catalog extends Migration
{
    public function safeUp()
    {
        $this->createTable('{{%catalog}}', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer(),
            'name' => $this->string(32),
            'number' => $this->string(10),
            'updated_at' => $this->integer(),
            'created_at' => $this->integer(),
        ]);

        $this->createTable('{{%list_name}}', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer(),
            'name' => $this->string(32),
            'updated_at' => $this->integer(),
            'created_at' => $this->integer(),
        ]);

        $this->createTable('{{%list}}', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer(),
            'list_name_id' => $this->integer(),
            'catalog_id' => $this->integer(),
            'status' => $this->smallInteger()->defaultValue(10),
            'updated_at' => $this->integer(),
            'created_at' => $this->integer(),
        ]);

        $this->createTable('{{%conference}}', [
           'id' => $this->primaryKey(),
            'name' => $this->string(32),
            'user_id' => $this->integer(),
            'number' => $this->string(32),
            'updated_at' => $this->integer(),
            'created_at' => $this->integer(),
        ]);

        $this->createIndex('FK_user_list_name', '{{%list_name}}', 'user_id');
        $this->addForeignKey('FK_user_list_name', '{{%list_name}}', 'user_id', '{{%user}}', 'id');

        $this->createIndex('FK_user_list', '{{%list}}', 'user_id');
        $this->addForeignKey('FK_user_list', '{{%list}}', 'user_id', '{{%user}}', 'id');
        $this->createIndex('FK_list_name_list', '{{%list}}', 'list_name_id');
        $this->addForeignKey('FK_list_name_list', '{{%list}}', 'list_name_id', '{{%list_name}}', 'id');
        $this->createIndex('FK_catalog_list', '{{%list}}', 'catalog_id');
        $this->addForeignKey('FK_catalog_list', '{{%list}}', 'catalog_id', '{{%catalog}}', 'id');

        $this->createIndex('FK_user_conference', '{{%conference}}', 'user_id');
        $this->addForeignKey('FK_user_conference', '{{%conference}}', 'user_id', '{{%user}}', 'id');


    }

    public function safeDown()
    {
        echo "m170720_084647_catalog cannot be reverted.\n";

        return false;
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m170720_084647_catalog cannot be reverted.\n";

        return false;
    }
    */
}
