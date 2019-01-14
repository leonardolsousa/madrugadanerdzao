import * as mongoose from 'mongoose';

const CrushSchema = new mongoose.Schema({
    nome : { type: String, required : true },
    apelido : { type: String, required : true },
    whatsapp : { type: String, required : true, unique: true },
    createAt : { type: Date, default: Date.now }
});

const model = mongoose.model('trouxas', CrushSchema);

class Controller{

    constructor(){ }

    create(req, res){

        this.createTrouxa(JSON.parse(req).result)
        .then(dados => res.status(200).json({"resultado" : dados}))
        .catch(err => res.status(400).json({"resultado" : err}));
    }

    createTrouxa(data){
        return model.create(data);
    }

    getDados(req, res){

        this.getTrouxas()
        .then(dados => res.status(200).json({"resultado" : dados}))
        .catch(err => res.status(400).json({"resultado" : err}));
    }

    getTrouxas(){
        return model.find({});
    }

    getDadosOne(req, res){
        const id = { _id: req.params.id }

        this.getTrouxasOne(id)
        .then(dados => res.status(200).json({"resultado" : dados}))
        .catch(err => res.status(400).json({"resultado" : err}));
    }

    getTrouxasOne(id){
        return model.find(id);
    }

    deleteDado(req, res){
       const id = { _id: req.params.id }

        this.deleteTrouxas(id)
        .then(dados => res.status(200).json({"resultado" : "dados apagados"}))
        .catch(err => res.status(400).json({"resultado" : err}));
    }

    deleteTrouxas(id){
        return model.deleteOne(id)
    }

    putDado(req, res){
        const id = { _id: req.params.id }
        const dadoTrouxa = req.body;

        this.putTrouxas(id, dadoTrouxa)
        .then(dados => res.status(200).json({"resultado" : dados}))
        .catch(err => res.status(400).json({"resultado" : err}));
    }

    putTrouxas(id, dadoTrouxa){
        return model.findOneAndUpdate(id, dadoTrouxa)
    }
}

export default Controller;