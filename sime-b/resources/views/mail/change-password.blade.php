@component("mail::message")

# Cambiar Contraseña

Hola {{ $user->first_name}}!! <br>
Has solicitado cambiar tu contraseña, si no fuiste tu, ignora este mensaje.

@component('mail::button', ['url' => $url])
Reset Password
@endcomponent

Gracias,<br>
{{ config('app.name') }}

@endcomponent
