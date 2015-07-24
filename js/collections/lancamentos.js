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

	getSum: function() {
		return this.reduce(
			function (memo, value) { 
				return new Number(memo) +  new Number(value.getValor()); 
			}, 0);
	},

	comparator: function(item) {
		//desc order
        return -(new Date(item.get('data')).getTime());
    }
});