FROM nginx

RUN rm -rf /usr/share/nginx/html/*
ADD app.tar.gz /usr/share/nginx/html

RUN mv /usr/share/nginx/html/build/dist/* /usr/share/nginx/html
