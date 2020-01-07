FROM php:7.3-apache

RUN apt-get update \
 && apt-get install -y vim git zlib1g-dev mariadb-client libzip-dev libpng-dev \
 && docker-php-ext-install zip mysqli pdo_mysql gd \
 && pecl install xdebug \
 && docker-php-ext-enable xdebug \
 && echo 'xdebug.remote_enable=on' >> /usr/local/etc/php/conf.d/xdebug.ini \
 && echo 'xdebug.remote_host=host.docker.internal' >> /usr/local/etc/php/conf.d/xdebug.ini \
 && echo 'xdebug.remote_port=9000' >>  /usr/local/etc/php/conf.d/xdebug.ini \
 && a2enmod rewrite \
 && sed -i 's!/var/www/html!/var/www/public!g' /etc/apache2/sites-available/000-default.conf \
 && mv /var/www/html /var/www/public \
 && curl -sS https://getcomposer.org/installer \
  | php -- --install-dir=/usr/local/bin --filename=composer \
 && echo "AllowEncodedSlashes On" >> /etc/apache2/apache2.conf

WORKDIR /var/www

COPY . .

RUN composer install

RUN composer require doctrine/dbal

RUN chown -R $USER:www-data storage

RUN chmod -R 775 storage

RUN rm public/storage


RUN ln -s /var/www/storage/app/public /var/www/public/storage

RUN php artisan cache:clear
RUN php artisan apidoc:generate

RUN apt-get install -y libfreetype6-dev libjpeg62-turbo-dev libpng-dev && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ && docker-php-ext-install -j$(nproc) gd
