require("angel")
    .ssh()
        .send(". ~/.nvm/nvm.sh; nvm use v0.4.11")
        .send("forever list | grep server.js")
    .exit()
.export(module);
