FROM onichandame/epics:3.14.12.8
ENV PORT=80
WORKDIR /app
ADD . /app
RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -
RUN yum install -y nodejs
RUN npm i -g yarn
RUN yarn install --prod --network-timeout=6000000
CMD ["yarn", "start"]
