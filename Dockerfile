FROM ubuntu:groovy
RUN apt update
RUN apt install -y wget python3 python3-venv sudo build-essential nano
RUN adduser --home /home/erd --shell /bin/bash --disabled-password erd
RUN echo "erd     ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
USER erd
RUN wget -O ~/erdpy-up.py https://raw.githubusercontent.com/ElrondNetwork/elrond-sdk/master/erdpy-up.py
RUN python3 ~/erdpy-up.py
RUN ~/elrondsdk/erdpy config set dependencies.elrond_proxy_go.tag master
RUN ~/elrondsdk/erdpy config set dependencies.elrond_go.tag master
RUN ~/elrondsdk/erdpy testnet prerequisites
#RUN ~/elrondsdk/erdpy config set chainID local-testnet
#RUN ~/elrondsdk/erdpy config set proxy http://0.0.0.0:7950
RUN mkdir ~/sandbox
RUN echo "[network]\nport_proxy=7950" > ~/sandbox/testnet.toml
WORKDIR ~/sandbox
RUN ~/elrondsdk/erdpy testnet config
CMD ["/home/erd/elrondsdk/erdpy", "testnet", "start"]


