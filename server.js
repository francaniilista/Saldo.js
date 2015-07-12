/**  Module dependencies. **/
var application_root = __dirname,
    express = require( 'express' ),
    bodyParser = require('body-parser'),
    path = require( 'path' ),
    mongoose = require( 'mongoose' );

var appServer= express();

appServer.use(express.static(path.join(application_root, './')));
appServer.use(bodyParser());

var port = 3000;

appServer.listen(port, function() {
    console.log('Express server listening on port %d in %s mode', port, appServer.settings.env);
});

// Configure server
appServer.configure( function() {
    //parses request body and populates request.body
    appServer.use(express.bodyParser());
    //checks request.body for HTTP method overrides
    appServer.use(express.methodOverride());
    //perform route lookup based on url and HTTP method
    appServer.use(appServer.router);
    //Where to serve static content
    appServer.use(express.static(path.join(application_root, './')));
    //Show all errors in development
    appServer.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

/*******************      MongoDB Definitions     *******************/
mongoose.connect('mongodb://localhost/planilhajs_database');

//schemas
var Lancamento = new mongoose.Schema({
    data: Date,
    valor: Number,
    descricao: String,
    tipo: String
});

var LancamentoModel = mongoose.model('Lancamento', Lancamento);
/************************    End MongoDB    **********************/

/************************      Routes      **********************/ 
//Get all lancamentos
appServer.get('/api/lancamentos', function(request, response) {
	return LancamentoModel.find(function(err, lancamentos) {
		if (!err) {
            console.log(lancamentos);
			return response.send(lancamentos);
		} else {
			return console.log(err);
		}
	});
});

//Insert
appServer.post('/api/lancamentos', function(request, response) {
    var lancamento = new LancamentoModel({
        data: request.body.data,
        valor: request.body.valor,
        descricao: request.body.descricao,
        tipo: request.body.tipo
    });

    return lancamento.save(function(err) {
        if(!err) {
            console.log('lancamento created');
            return response.send(lancamento);
            } else {
                console.log(err);
            }
    });
});

//Get a single lancamento by id
appServer.get('/api/lancamentos/:id', function(request, response) {
    return LancamentoModel.findById( request.params.id, function(err, lancamento) {
        if(!err) {
            return response.send(lancamento);
        } else {
            return console.log(err);
        }
    });
});

//Update a lancamento
appServer.put('/api/lancamentos/:id', function(request, response) {
    console.log('Updating lancamento ' + request.body.title);
    return LancamentoModel.findById( request.params.id, function(err, lancamento) {
        lancamento.title = request.body.title;
        lancamento.valor = request.body.valor;
        lancamento.descricao = request.body.descricao;
        keywords: request.body.keywords;       // NEW

        return lancamento.save(function(err) {
            if (!err) {
                console.log('lancamento updated');	            
    	    } else {
        	    console.log(err);
        	}
        	return response.send(lancamento);
        });
    });
});

//Delete a lancamento
appServer.delete('/api/lancamentos/:id', function(request, response) {
    console.log('Deleting lancamento with id: ' + request.params.id);
    return LancamentoModel.findById(request.params.id, function(err, lancamento) {
        return lancamento.remove(function(err) {
            if(!err) {
                console.log('lancamento removed');
                return response.send('');
            } else {
                console.log(err);
            }
        });
    });
});
/************************     End Routes     **********************/ 