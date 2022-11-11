db.createUser(
    {
        user: "iuvity",
        pwd: "iuvity",
        roles:[
            {
                role: "readWrite",
                db:   "iuvity"
            }
        ]
    }
);