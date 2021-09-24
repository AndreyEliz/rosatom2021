# Сервер
## Требования
1. Visual Studio 2017 и выше
2. NET Core 2.1 - https://dotnet.microsoft.com/download/dotnet-core/2.1
3. Url ReWriter - https://www.iis.net/downloads/microsoft/url-rewrite
4. IIS 7.5 и Выше

##Сборка

1. Запустить Visual Studio
2. Опубликовать проект в локальную папку ~/publish
3. Добавить приложение **RosAtom** в **IIS** для **.Net Core 2.1**, указать путь на папку **~/publish**
4. Добавить виртуальный **Web**(Путь до **UI** папки) каталог для **RosAtom**
5. Добавить в Web.config из папки *~/publish** правило для rewrite
```
<system.webServer>
        <rewrite>
            <rules>
                <rule name="ToUi">
                    <match url="static/(.*)|config.json" />
                    <action type="Rewrite" url="web/{R:0}" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
```

# Клиент
React + Redux + TS + MUI
## Требования
1. yarn

## Запуск
1. cd ./client
2. yarn install
3. yarn start
