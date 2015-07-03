var app = app || {};

app.MainView = Backbone.View.extend({
	el: '#main',

	events: {
		'click #add': 'addLancamento'
	},

	initialize: function (lancamentos) {
		this.collection = new app.Lancamentos(lancamentos);
		this.table = $('#lanceRows');
		this.collection.fetch({reset: true});
		this.render();

		this.listenTo(this.collection, 'add', this.renderLancamento);
		this.listenTo(this.collection, 'reset', this.render);
	},

	render: function() {
		this.collection.each(function (item) { this.renderLancamento(item); }, this);
	},

	renderLancamento: function(item) {
		var lancamentoView = new app.LancamentoView({
			model: item
		});

		this.table.append(lancamentoView.render().el);
	},

	addLancamento: function( e ) {
		e.preventDefault();

	    var formData = {};

	    $('#addLancamento div fieldset').children('input').each(function (i, el) {
	    	if ($(el).val() != '') {
	            if (el.id === 'data') {
	                formData[el.id] = $('#data').datepicker('getDate').getTime();
	            } else {
	                formData[el.id] = $(el).val();
	            }
	        }
	        // Clear input field value
	        $(el).val('');
	    });

	    this.collection.create(formData);
	}
});