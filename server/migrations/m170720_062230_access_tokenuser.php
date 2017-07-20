<?php

use yii\db\Migration;

class m170720_062230_access_tokenuser extends Migration
{
    public function safeUp()
    {
        $this->addColumn('{{%user}}', 'access_token', $this->string(32)->notNull());
    }

    public function safeDown()
    {
        $this->dropColumn('{{%user}}', 'access_token');
    }

}
