FROM node:20-alpine

# Set working directory
WORKDIR /app

# Expose port Next.js
EXPOSE 3000

# Perintah default saat container berjalan
# Menjalankan npm install setiap kali start untuk memastikan semua library (seperti yg diminta) terinstall
# Lalu menjalankan server dev
CMD ["sh", "-c", "npm install && npm run dev"]
