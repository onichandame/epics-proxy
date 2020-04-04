FROM onichandame/epics:3.14.12.8
WORKDIR /app
ADD server.py /app/server.py
ADD requirements.txt /app/requirements.txt
RUN python3 -m venv .env
RUN source .env/bin/activate
RUN pip install -r requirements.txt
RUN python server.py
