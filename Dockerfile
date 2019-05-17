FROM nginx

RUN rm -rf /usr/share/nginx/html/*
RUN ls     /usr/share/nginx/html
ADD ./app.tar.gz /usr/share/nginx/html
RUN mv /usr/share/nginx/html/build/dist/bookmanagement-angular/* /usr/share/nginx/html
RUN ls /usr/share/nginx/html
# RUN tar -zxvf app.tar.gz

RUN ls /usr/share/nginx/html
