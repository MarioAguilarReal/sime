@echo off
echo Setting up deploy url in the environment file....
echo REACT_APP_API_URL=https://sime.sgr111.com/api > .env

echo Haciendo el build de la app de React....
call npm run build

echo Copiando los archivos de la app de React al servidor Laravel....
xcopy build\* ..\sime-b\public\ /E /H /Y

echo ¡Listo! La app de React ha sido desplegada en el servidor Laravel.

@REM proximamente subir a hosting
