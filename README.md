# Prerequisites:
Before you start, you will need:
- Docker installed .  [How To Install and Use Docker](https://docs.docker.com/install/)
- Docker Compose installed . [How To Install and Use Docker Compose](https://docs.docker.com/compose/install/)

# Usage:

- cd to where your docker-compose.yml file lives . 
exemple :
```console
~ $ cd IGL_TP/
```

- Start containers in the background: 
```console
~/IGL_TP $ docker-compose up -d
```
## View the Tp Website

- Open your broser and navigat to [http://localhost:4200/](http://localhost:4200/) . 

## View the Tp documentation

- Open your broser and navigat to [http://localhost:8000/docs/](http://localhost:8000/docs/) .

## RUN the unit test

- open the authservice bash By :
```console
~/IGL_TP $ docker-compose exec authservice /bin/bash
```

- Run the unit tests : 
```console
root@b348577f8faa:/var/www# vendor/bin/phpunit 
```

## RUN the Selenium test
- Download and configure your WebDriver for Chrome (ChromeDriver) . [Download ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/downloads)

- cd to selenium folder , and run the selenuim server :
```console
~/IGL_TP/selenium $ java -jar selenium-server-standalone-3.141.59.jar -enablePassThrough false
```

- Run the selenium test By runing the the test.php script : 
```console
~/IGL_TP/selenium $ php test.php
```