<!DOCTYPE html>
<html>
<head>
    <title>Cambio de Contraseña</title>
</head>
<body>
    <h1>Hola, {{ $user->name }}</h1>
    <p>Hemos recibido una solicitud para restablecer tu contraseña. Haz clic en el siguiente enlace para cambiarla:</p>
    <a href="{{ url(env('FRONTEND_URL') . '/auth/forget-password?token=' . $token . '&email=' . $user->email) }}">Cambiar Contraseña</a>
    <p>Si no solicitaste este cambio, ignora este correo.</p>
</body>
</html>
