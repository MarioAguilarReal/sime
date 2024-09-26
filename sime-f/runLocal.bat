@echo off
echo running runLocal.bat
echo REACT_APP_API_URL=http://127.0.0.1:8000/api > .env

echo starting the app
call npm start

echo ¡Listo! La app de React ha sido desplegada en el servidor Laravel.

