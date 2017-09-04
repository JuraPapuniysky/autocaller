<?php
/**
 * Created by PhpStorm.
 * User: wsst17
 * Date: 01.09.17
 * Time: 8:48
 */

namespace app\amiactions;


use PAMI\Listener\IEventListener;
use PAMI\Message\Event\EventMessage;

class EventListener implements IEventListener
{

    /**
     * Event handler.
     *
     * @param \PAMI\Message\Event\EventMessage $event The received event.
     *
     * @return void
     */
    public function handle(EventMessage $event)
    {
        // TODO: Implement handle() method.
    }
}