
const user = require("../model/user");
const User = require("../model/user");
const csv = require("csvtojson");
const Csvparser = require("json2csv").Parser;

module.exports = {
    importuser: async (req, res) => {
        try {
            csv().
                fromFile(req.file.path)
                .then(async (data) => {
                    const userData = [];

                    for (i = 0; i < data.length; i++) {
                        userData.push({
                            first_name: data[i].first_name,
                            last_name: data[i].last_name,
                            company_name: data[i].company_name,
                            address: data[i].address,
                            city: data[i].city,
                            county: data[i].county,
                            state: data[i].state,
                            email: data[i].email,
                            phone: data[i].phone
                        })
                    }
                    const user = await User.insertMany(userData)
                })
            res.status(200).json({
                message: "import data"
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "something went wrong"
            })
        }
    },
    exportuser: async (req, res) => {
        try {
            let users = []

            const userData = await User.find({})
            userData.forEach(user => {
                const { first_name, last_name, company_name, address, city, state, email, phone } = user
                users.push({ first_name, last_name, company_name, address, city, state, email, phone })
            });

            const csvfield = ['first_name', 'last_name', 'company_name', 'address', 'city', 'state', 'email', 'phone']
            const csvparser = new Csvparser(csvfield)
            const csvdata = csvparser.parse(users)

            res.setHeader("Content-Type", "text/csv");
            res.setHeader("Content-Disposition", "attatchment:filename=userdata.csv");

            res.status(200).json(csvdata)
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "something went wrong"
            })
        }
    }
}