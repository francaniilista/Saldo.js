var app = app || {};

app.Lancamentos = Backbone.Collection.extend({
	model: app.Lancamento,
	url: '/api/lancamentos',

	initialize: function() {
		this.on('add', this.updateSet, this);
	},

	updateSet: function() {
		items = this.models;
	},

	getTotal: function() {
		return this.reduce(function (memo, value) { return memo + value.getValor(); }, 0);
	}
});