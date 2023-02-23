FROM python:3.11

RUN mkdir -p /code/back

WORKDIR /code/back

# RUN apk update && apk add python3-dev \
#                           gcc \
#                           libc-dev \
#                           libffi-dev

COPY .  .

RUN pip install -r requirements.txt

WORKDIR /code/back/app

EXPOSE 8000
