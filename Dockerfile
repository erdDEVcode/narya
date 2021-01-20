FROM ubuntu:groovy
RUN apt update
RUN apt install -y wget python3 python3-venv sudo build-essential nano net-tools apt-transport-https
RUN adduser --home /home/erd --shell /bin/bash --disabled-password erd
RUN echo "erd     ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
USER erd
RUN wget -O ~/erdpy-up.py https://raw.githubusercontent.com/ElrondNetwork/elrond-sdk/master/erdpy-up.py
RUN python3 ~/erdpy-up.py
RUN ~/elrondsdk/erdpy config set dependencies.elrond_proxy_go.tag master
RUN ~/elrondsdk/erdpy config set dependencies.elrond_go.tag master
RUN ~/elrondsdk/erdpy testnet prerequisites
RUN ~/elrondsdk/erdpy config set chainID narya
RUN ~/elrondsdk/erdpy config set proxy http://0.0.0.0:7950
RUN mkdir ~/sandbox
RUN echo "[network]\nport_proxy=7950" > ~/sandbox/testnet.toml
WORKDIR /home/erd/sandbox
RUN ~/elrondsdk/erdpy testnet config

# elastic search setup
#RUN wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
#RUN sudo apt update
##RUN echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-7.x.list
#RUN sudo apt install elasticsearch
# RUN printf '[ElasticSearchConnector]\n\
#   Enabled    = true\n\
#   URL        = "http://localhost:9200'\
#   > ~/sandbox/testnet/proxy/config/external.toml
# RUN printf '[ElasticSearchConnector]\n\
#   Enabled           = true\n\
#   IndexerCacheSize  = 100\n\
#   URL               = "http://localhost:9200"\n\
#   UseKibana         = false\n\
#   Username          = ""\n\
#   Password          = ""\n\
#   EnabledIndexes    = ["tps", "rating", "transactions", "blocks", "validators", "miniblocks", "rounds", "accounts", "accountshistory"]'\
#   > ~/sandbox/testnet/validator00/config/external.toml
# RUN printf '[ElasticSearchConnector]\n\
#   Enabled           = true\n\
#   IndexerCacheSize  = 100\n\
#   URL               = "http://localhost:9200"\n\
#   UseKibana         = false\n\
#   Username          = ""\n\
#   Password          = ""\n\
#   EnabledIndexes    = ["tps", "rating", "transactions", "blocks", "validators", "miniblocks", "rounds", "accounts", "accountshistory"]'\
#   > ~/sandbox/testnet/validator01/config/external.toml

# start script
RUN printf '#!/bin/bash\n\
  /home/erd/elrondsdk/erdpy testnet clean\n\
  /home/erd/elrondsdk/erdpy testnet config\n\
  /home/erd/elrondsdk/erdpy testnet start'\
  > ~/sandbox/start.sh
  
RUN chmod +x ~/sandbox/start.sh
CMD ["/home/erd/sandbox/start.sh"]


