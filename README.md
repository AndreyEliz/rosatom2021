# Сервер
## Требования
1. Visual Studio 2019
2. NET Core 5 - https://dotnet.microsoft.com/download
3. Url ReWriter - https://www.iis.net/downloads/microsoft/url-rewrite
4. IIS 7.5 и Выше

##Сборка

1. Запустить Visual Studio
2. Опубликовать проект в локальную папку ~/publish
3. Добавить приложение **RosAtom** в **IIS** для **.Net Core 5**, указать путь на папку **~/publish**
4. Запустить UI Клиент
5. Добавить в Web.config из папки *~/publish** правило для rewrite и указать адрес UI клиента
```
<system.webServer>
        <rewrite>
            <rules>
                <rule name="test">
                    <match url="RosAtom/UI" />
                    <action type="Rewrite" url="http://localhost:3000/#/" />
                </rule>
				<rule name="ToUi">
                    <match url="static/(.*)|config.json" />
                    <action type="Rewrite" url="http://localhost:3000/{R:0}" />
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
