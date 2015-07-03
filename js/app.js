var app = app || {};

$(function() {
    var lances = [
    	{ data: new Date(), valor: 312.45, descricao: 'dinheiro do pagamento de fulano de tal que deixou para pagar nesta data', tipo: 'C'},
    	{ data: new Date(), valor: 200.87, descricao: '', tipo: 'C'},
    	{ data: new Date(), valor: 154.93, descricao: '', tipo: 'D'}
    ];

	$( '#data' ).datepicker({
	    dateFormat: 'dd/MM/yy',
	    dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
	    dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
	    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
	    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
	    monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
	    nextText: 'Próximo',
	    prevText: 'Anterior'
	});
    new app.MainView();
});