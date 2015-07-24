var app = app || {};

app.MainView = Backbone.View.extend({
	el: '#main',

	events: {
		'click #add': 'addLancamento'
	},

	initialize: function (lancamentos) {
		this.table = this.configureTable();
		this.tableRows = $('#lanceRows');
		this.collection = new app.Lancamentos(lancamentos);
		this.collection.fetch({reset: true});
		
		this.listenTo(this.collection, 'add', this.renderLancamento);
		this.listenTo(this.collection, 'remove', this.calculateFooter);
		this.listenTo(this.collection, 'reset', this.render);

		$('#valor').keyup(function () { 
		    this.value = this.value.replace(/[^0-9\,]/g,'');
		});

		this.render();
	},

	configureTable: function() {
		var that = this;
		return $('#table_lancamentos').DataTable({
			paging: false,
			scrollY: 400,
			orderClasses: false,
			autoWidth: false,
			info: false,
			"language": {
                "url": "https://cdn.datatables.net/plug-ins/1.10.7/i18n/Portuguese-Brasil.json"
            },
            "columnDefs": [
				{ "orderable": false, "targets": [4] },
				{ "searchable": false, "targets": [4]}
			],          	
            "footerCallback": function ( row, data, start, end, display ) {
            	var api = this.api();
            	$(api.column(1).footer()).html('Total: R$'+ that.collection.getSum().toFixed(2).replace('.', ','));
            }
		});
	},

	render: function() {
		this.collection.each(function (item) { this.renderLancamento(item); }, this);
	},

	renderLancamento: function(item) {
		var lancamentoView = new app.LancamentoView({
			model: item
		});
		this.table.row.add(lancamentoView.render().el);
		this.table.draw();
	},

	addLancamento: function( e ) {
		e.preventDefault();

	    var formData = {};

	    $('#addLancamento fieldset div').children('input').each(function (i, el) {
	    	if ($(el).val() != '') {
	            if (el.id === 'data') {
	                formData[el.id] = $('#data').datepicker('getDate').getTime();	                
	            } else if (el.id === 'valor') {
	                formData[el.id] = $(el).val().replace(',', '.');
	            } else {
	            	formData[el.id] = $(el).val();
	            }
	        }	        
	    });

	    $('#addLancamento fieldset div label').children('input').each(function (i, el) {
	    	if (el.id === 'tipo') {
            	if ($(el).is(':checked')) {
            		formData[el.id] = $(el).val();	
            	}	            	
            }
		});

	    var me = this;
	    var options = {
	    	success: function () {
	    		me.hideErrors();
	    		me.clearFields();
	    		$('#msg-form').html('Lançamento salvo com sucesso!');
        		$('#msg-form').addClass('bg-success text-success');
        		
        		window.setTimeout(function() {
        			$('#msg-form').removeClass('bg-success text-success');
					$('#msg-form').html('');
				}, 5000);
				
	    		console.log('Lançamento salvo com sucesso!');
        	},
        	error: function () {
        		me.hideErrors();
        		$('#msg-form').html('Erro ao salvar lançamento!');
        		$('#msg-form').addClass('bg-danger text-danger');

        		window.setTimeout(function() {
        			$('#msg-form').removeClass('bg-danger text-danger');
					$('#msg-form').html('');
				}, 2000);

        		console.log('Erro ao salvar lançamento!');
        	}
    	};

    	var lancamento = new app.Lancamento(formData);
    	if (lancamento.isValid()) {
    		this.collection.create(formData, options);
    	} else {
    		this.showErrors(lancamento.validationError);
    	}

		lancamento.off();
    	lancamento = null;
	}, 

	showErrors: function (errors) {
		_.each(errors, function(error) { 
			$('#msg-' + error.name).html(error.message);
			// class="glyphicon glyphicon-ok form-control-feedback" 
			// class="glyphicon glyphicon-remove form-control-feedback"
		}, this);

		this.clearFieldsWithErrors(errors);
	},

	hideErrors: function () {
		$('#msg-data').html('');
		$('#msg-valor').html('');
		$('#msg-descricao').html('');
		$('#msg-form').html('');
	},

	clearFieldsWithErrors: function (errors) {
		_.each(errors, function(error) { $(error.name).val(''); }, this);
	},

	clearFields: function () {
		$('#addLancamento fieldset div').children('input').each(function (i, el) {
			$(el).val('');
		});
	},

	calculateFooter: function () {
		$(this.table.column(1).footer()).html('Total: R$'+ this.collection.getSum().toFixed(2).replace('.', ','));
	}
});