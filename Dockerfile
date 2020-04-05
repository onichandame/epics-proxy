FROM onichandame/epics:3.14.12.8
WORKDIR /app
ADD . /app
RUN yum install python3 -y
RUN python3 -m venv .env
RUN source .env/bin/activate
RUN pip install -r requirements.txt
RUN python server.py
