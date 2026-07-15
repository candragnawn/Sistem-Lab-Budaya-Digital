FROM php:8.2-cli

# Install dependencies yang dibutuhkan Laravel
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libwebp-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    curl \
    git \
    libzip-dev

# Konfigurasi dan Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

RUN pecl install redis && docker-php-ext-enable redis

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Expose port
EXPOSE 8000

# Perintah default saat container berjalan
# Kita menjalankan composer install untuk memastikan semua library (seperti yg Anda minta) terinstall
# Lalu menjalankan server artisan
CMD bash -c "composer install --no-interaction && php artisan serve --host=0.0.0.0 --port=8000"
