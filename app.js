const express = require ('express');
const mongoose = require ('mongoose');
const cors = require ('cors');

require("./models/Colaboradores");
const Colaboradores = mongoose.model('funcionario');

const app = express();

app.use( express.json());

app.use ((req,res,next) =>{
    app.use(cors());
    res.header("access-control-allow-origin", "*");
    res.header("access-control-allow-methods", "GET,PUT,POST,DELETE");
    next();
});

mongoose.connect('mongodb://localhost/raphabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then (()=>{
    console.log("conexão com mongodb concluída com sucesso");
}) .catch (() =>{
    console.log ("ERRO: falha de conexão com mongodb");
});

app.get("/", (req, res) => {
    Colaboradores.find({}).then((funcionario) => {
        return res.json(funcionario);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum funcionario encontrado!"
        })
    })
});

app.get("/funcionario/:id", (req, res) => {
    Colaboradores.findOne({ _id: req.params.id }).then((funcionario) => {
        return res.json(funcionario);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum funcionario encontrado!"
        })
    })
})

app.post("/funcionario", (req, res) => {
    const funcionario = Colaboradores.create(req.body, (err) => {
        if (err) return res.status(400).json({ 
            error:true,
            message:"Erros: funcionario nao encontrado"
        })

        return res.status(200).json({ 
            error:false,
            message:" funcionario cadastrado com sucesso"
        })
    })
    
});

app.put("/funcionario/:id", (req, res) => {
    const funcionario = Colaboradores.updateOne({ _id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error: funcionario não foi editado com sucesso!"
        });

        return res.json({
            error: false,
            message: "funcionario editado com sucesso!"
        });
    });
});

app.delete("/funcionario/:id", (req, res) => {
    const funcionario = Colaboradores.deleteOne({ _id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error: funcionario não foi apagado com sucesso!"
        });

        return res.json({
            error: false,
            message: "funcionario apagado com sucesso!"
        });
    });
});

app.listen(8000, () =>{
    console.log ("servidor iniciado na porta 8000: http://localhost:8000/");
});

