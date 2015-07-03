var app = app || {};

app.LancamentoView = Backbone.View.extend({
	tagName: 'tr',
	template: _.template($('#lancamentoTemplate').html()),

	events: {
		'click .delete': 'deleteLancamento'
	},

	render: function() {
		this.$el.html(this.template(this.model.attributes));
		return this;
	},

	deleteLancamento: function() {
		this.model.destroy();
		this.remove();
	}
});