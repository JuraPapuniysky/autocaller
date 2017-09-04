<?php


namespace app\components;


use app\amiactions\ConfbridgeSetSingleVideoSrc;
use app\amiactions\EventListener;
use PAMI\Client\Impl\ClientImpl;
use yii\base\Component;
use yii\base\Exception;
use yii\web\NotFoundHttpException;

class PamiComponent extends Component
{
    public $clientImpl;
    public $options;
    public $context;

    public function initAmi()
    {
        try {

            $this->clientImpl = new ClientImpl($this->options);
            $this->clientImpl->registerEventListener(new EventListener());
            $this->clientImpl->open();
        } catch (Exception $e) {
            throw new NotFoundHttpException();
        }
    }

    public function setSingleVideoSrc($conference, $channel)
    {
        $message = $this->clientImpl->send(new ConfbridgeSetSingleVideoSrc($conference, $channel));
        usleep(1000);
        return $message;
    }

    public function closeAmi()
    {
        $this->clientImpl->process();
        $this->clientImpl->close();
    }
}