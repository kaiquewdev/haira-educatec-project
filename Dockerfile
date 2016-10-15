FROM kaiquewdev/docker-nodejs-compiled
ADD . /code
WORKDIR /code
RUN npm install --unsafe-perm || \
  ((if [ -f npm-debug.log ]; then \
      cat npm-debug.log; \
    fi) && false)
CMD npm start
