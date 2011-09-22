require("angel")
    .ssh()
        .send("cd ~/project/site")
        .send("tail ./server-output.log")
    .exit()
.export(module);
