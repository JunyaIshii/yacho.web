<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification
{
    protected $url;

    public function __construct($url)
    {
        $this->url = $url;
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('パスワードリセット')
            ->line('パスワードリセットのリクエストを受け付けました。')
            ->action('パスワードリセット', $this->url)
            ->line('このパスワードリセットリンクは、60分後に失効します。')
            ->line('パスワードのリセットにお心当たりが無い場合は、このメールを無視してください。');
    }

    public function via($notifiable)
    {
        return ['mail'];
    }
}
