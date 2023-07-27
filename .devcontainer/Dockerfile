FROM node:20.1.0-slim

# https://code.visualstudio.com/remote/advancedcontainers/add-nonroot-user
ARG USERNAME=node

# Create the user
RUN apt-get update \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# ********************************************************
# * Anything else you want to do like clean up goes here *
# ********************************************************

# 必要になりそうな物だけ先に入れる
RUN apt-get -y install curl git

# Next.js+NestJSnoモノレポ構成にするつもりなのでyarnとNestのCLI入れる
RUN npm install -g npm @nestjs/cli \
    && corepack enable

# [Optional] Set the default user. Omit if you want to keep the default as root.
USER $USERNAME
