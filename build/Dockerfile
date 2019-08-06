FROM nginx

# application files.
RUN rm -rf /usr/share/nginx/html/*
RUN ls     /usr/share/nginx/html
ADD ./app.tar.gz /usr/share/nginx/html
RUN mv /usr/share/nginx/html/bookmanagement-angular/* /usr/share/nginx/html

# Adding nginx config file.
RUN rm -rf /etc/nginx/conf.d/default.conf
ADD ./default.conf /etc/nginx/conf.d/default.conf