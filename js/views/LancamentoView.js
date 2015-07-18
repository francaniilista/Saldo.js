var app = app || {};

app.LancamentoView = Backbone.View.extend({
	tagName: 'tr',
	className: '',
	template: _.template($('#lancamentoTemplate').html()),

	events: {
		'click .delete': 'deleteLancamento'
	},

	initialize: function () {
		if (this.model.get('tipo') === 'C') {
			this.className = 'success';
		} else if (this.model.get('tipo') === 'D') {
			this.className = 'danger';
		}
	},

	render: function() {
		this.$el.addClass(this.className);
		this.$el.html(this.template(this.model.attributes));
		return this;
	},

	deleteLancamento: function() {
		this.model.destroy();
		this.remove();
	}
});