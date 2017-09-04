<?php
return [
    'class' => 'app\components\PamiComponent',
    'options' => [
        'host' => '10.109.36.195',
        'port' => '5038',
        'username' => 'bos',
        'secret' => 'Bthfh[bZ',
        'connect_timeout' => 50000,
        'read_timeout' => 50000,
        'scheme' => 'tcp://',// try tls://
    ],
    'context' => 'from-internal',
];