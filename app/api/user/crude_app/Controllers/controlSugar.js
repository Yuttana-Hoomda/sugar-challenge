
const modelSugar = require("../Model/modelSugar")
exports.read = async (req, res) => {
    try {
        // code
        const name = req.params.name;
        const sugar = await modelSugar.findOne({ name: name }).exec();
        if (sugar) {
            res.send(sugar);
        } else {
            res.status(404).send('Data not found');
        }
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}
   
exports.list = async (req, res) => {
    try {
        // code
        const sugar = await modelSugar.find({}).exec();
        res.send(sugar)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error List')
    }
}
exports.create = async (req, res) => {
    try {
        // code
        console.log(req.body)
        const sugar = await modelSugar(req.body).save()
        res.send(sugar)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error Create')
    }
}

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const updated = await modelSugar  // ใช้ modelSugar
            .findOneAndUpdate({ _id: id }, req.body, { new: true })
            .exec();
        res.send(updated);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error Update');
    }
}

exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const removed = await modelSugar  
            .findOneAndDelete({ _id: id })
            .exec();
        res.send(removed);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error remove');
    }
}
