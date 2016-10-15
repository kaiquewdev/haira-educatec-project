FROM gcr.io/google_appengine/nodejs
RUN /usr/local/bin/install_node '>= 0.12.0'
ADD . /code
WORKDIR /code
RUN npm install --unsafe-perm || \
  ((if [ -f npm-debug.log ]; then \
      cat npm-debug.log; \
    fi) && false)
CMD npm start
