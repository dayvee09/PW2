FROM mcr.microsoft.com/devcontainers/javascript-node:18-bookworm

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y --no-install-recommends \
        apache2 \
        libapache2-mod-php \
        php \
        php-mysql \
        php-mbstring \
        default-mysql-client \
        python3 \
        make \
        g++ \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

RUN a2enmod rewrite

COPY apache-monvino.conf /etc/apache2/sites-available/monvino.conf
RUN a2ensite monvino.conf && a2dissite 000-default
