var app = app || {};

app.Lancamento = Backbone.Model.extend({
	defaults: {
		data: '',
		valor: '',
		descricao: '',
		tipo: 'C'
	},

	initialize: function() {
		this.listenTo(this, 'invalid', function (model, error, options) {
			console.log(model,error,options);
		});
		
		if (this.get('tipo') === "D" && new Number(this.getValor()) > new Number(0)) {
			this.set('valor', this.get('valor') * -1);
		}
	},

	getValor: function() {
		return this.get('valor');
	},

	parse: function(response) {
		response.id = response._id;
		return response;
	},

	validate: function (attrs) {
		var errors = [];

		if (!attrs.data) {
			errors.push({name: 'data', message: 'Please fill date field.'});
		}

		if (!attrs.valor) {
			errors.push({name: 'valor', message: 'Please fill value field.'});
		}

		if (!attrs.descricao) {
			errors.push({name: 'descricao', message: 'Please fill description field.'});
		}

		return errors.length > 0 ? errors : false;
	}
});