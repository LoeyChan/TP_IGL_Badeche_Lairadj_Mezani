FROM mysql

ENV MYSQL_ROOT_PASSWORD root
ENV MYSQL_DATABASE esi

COPY ./schema.sql /docker-entrypoint-initdb.d/schema.sql


