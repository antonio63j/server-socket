# Instalación para el desarrollo

Reconstrución de módulos node
```
npm install
```

no requiere de módulo globales, el compilaror y otros están en local


tsc a la escucha para compliar cuando hay cambios
```
como tenermos el compilador en local:
npm run -- tsc -w

si lo tenemos global:
tsc -w

```

para ejecutar cuando hay cambios es dist/
```
npm run -- nodemon dist/  (nodemon en local)
nodemon dist/ (nodemon en global)
```



