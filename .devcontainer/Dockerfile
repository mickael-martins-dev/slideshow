FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye

# install jless (because its not available at https://containers.dev/features at time of writing)
RUN NONINTERACTIVE=1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" \
        && (echo; echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"') >> /home/vscode/.profile \
        && eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)" \
        && brew install jless

RUN git clone https://github.com/powerline/fonts.git && cd fonts && ./install.sh && cd .. && rm -rf fonts

RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true
RUN zsh -c 'git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions'
RUN zsh -c 'git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting'
RUN cp ./.zshrc ~

RUN mv ~/.zshrc ~/.zshrc.bak
RUN sudo sh -c "$(wget -O- https://raw.githubusercontent.com/deluan/zsh-in-docker/master/zsh-in-docker.sh)" -- \
    -t agnoster

# remove newly created zshrc
RUN rm -f ~/.zshrc
# restore saved zshrc
RUN mv ~/.zshrc.bak ~/.zshrc
# update theme
RUN sed -i '/^ZSH_THEME/c\ZSH_THEME="agnoster"' ~/.zshrc 