var app = app || {};

app.Lancamento = Backbone.Model.extend({
	defaults: {
		data: new Date(),
		valor: new Number(0.00),
		descricao: "",
		tipo: "C"
	},

	getValor: function() {
		return this.get('valor');
	},

	parse: function(response) {
		response.id = response._id;
		return response;
	}
});