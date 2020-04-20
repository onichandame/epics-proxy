FROM onichandame/epics:3.14.12.8
WORKDIR /app
ADD . /app
RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -
RUN yum install nodejs
RUN npm i -g yarn
RUN yarn .
