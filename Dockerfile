# To build: `docker build --tag stuco .`
# To run: `docker run --rm -it stuco`
# Both: `docker build --tag stuco . && docker run --rm -it stuco`

# TODO: don't forget to add a local volume that stores content

# To run a blank debian image with no configuration from the commandline
# `docker pull debian:latest && docker run -it debian:latest /bin/bash`

FROM debian:stable

# make sure the image is up to date and has proper mirrors
RUN apt update
RUN apt dist-upgrade -y

# install build tools
RUN apt install -y build-essential gcc g++ cmake make sudo unzip # generally good tools for installing/building other software

# install brew, for installing other software
RUN apt install -y curl git
RUN /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
ENV PATH="/home/linuxbrew/.linuxbrew/bin:/home/linuxbrew/.linuxbrew/sbin:${PATH}"
# RUN echo 'PATH="/home/linuxbrew/.linuxbrew/bin:/home/linuxbrew/.linuxbrew/sbin:$PATH"' >> /root/.bashrc
# RUN . $HOME/.bashrc # this is just sourcing the file, but /bin/sh doesn't have that keyword
RUN brew update

# https://github.com/neovim/neovim/wiki/Building-Neovim#build-prerequisites
RUN apt install -y ninja-build gettext cmake unzip curl git # nvim build from source requirements
# the opt/ directory is typically used for installing optional or add-on software packages that are not part of the core operating system; synonomous with optional
RUN git clone https://github.com/neovim/neovim.git /opt/neovim
WORKDIR /opt/neovim
RUN git checkout stable
RUN make CMAKE_BUILD_TYPE=RelWithDebInfo && make install


# already included with debian:latest: find, grep, cat, watch, xargs
RUN apt install -y git tmux vim # living inside the terminal
RUN apt install -y curl wget netcat-openbsd # network interaction
RUN apt install -y less man tldr # documentation
RUN apt install -y gdb # generally good to have
RUN apt install -y parallel # prename
RUN brew install ripgrep

# fzf





# not important for this class, but important for some crypto and security classes
RUN rm /dev/random && ln -s /dev/urandom /dev/random

# This line makes it impossible to manually install software inside the container
# RUN rm -rf /var/lib/apt/lists/*



# it will be created even if it doesn't exist
WORKDIR /stuco

# this gets overwritten if the use provides any runtime cmdline args
CMD "/bin/bash"
# whereas this gets appended to when using `docker run <image> [cmd]`
ENTRYPOINT "/bin/bash"
