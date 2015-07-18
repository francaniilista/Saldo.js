var app = app || {};

$(function() {
    var lances = [
    	{ data: new Date(2015,5,24), valor: 312.45, descricao: 'pagamento recebido de cliente x', tipo: 'C'},
    	{ data: new Date(2015,5,30), valor: 200.00, descricao: 'pagamento recebido de cliente y', tipo: 'C'},
    	{ data: new Date(2015,5,17), valor: 153.12, descricao: 'pagamento recebido de cliente z', tipo: 'C'},
    	{ data: new Date(2015,5,15), valor: 345.50, descricao: 'pagamento recebido de cliente a', tipo: 'C'},
    	{ data: new Date(2015,5,2),  valor: 200.87, descricao: 'pagamento recebido de cliente b', tipo: 'C'},
    	{ data: new Date(2015,6,10), valor: 154.93, descricao: 'despesa de aluguel de máquina', tipo: 'D'},
    	{ data: new Date(2015,6,10), valor:  50.93, descricao: 'pagamento recebido de cliente c', tipo: 'C'},
    	{ data: new Date(2015,6,10), valor:  64.90, descricao: 'pagamento recebido de cliente d', tipo: 'C'},
    	{ data: new Date(2015,6,13), valor: 320.99, descricao: 'pagamento recebido de cliente e', tipo: 'C'},
    	{ data: new Date(2015,6,13), valor: 100.00, descricao: 'despesa de conta de energia', tipo: 'D'},
    	{ data: new Date(2015,5,27), valor:  85.90, descricao: 'pagamento recebido de cliente f', tipo: 'C'},
    	{ data: new Date(2015,5,20), valor: 159.90, descricao: 'pagamento recebido de cliente g', tipo: 'C'},
    	{ data: new Date(2015,6,7),  valor:  48.97, descricao: 'despesa de conta de água', tipo: 'D'},
    	{ data: new Date(2015,6,2),  valor:  80.00, descricao: 'despesa de conta de limpeza', tipo: 'D'},
    	{ data: new Date(2015,6,5),  valor: 457.90, descricao: 'pagamento recebido de cliente h', tipo: 'C'},
    	{ data: new Date(2015,6,8),  valor:  21.74, descricao: 'despesa de almoço em restaurante', tipo: 'D'},
    	{ data: new Date(2015,6,9),  valor:  40.00, descricao: 'despesa de almoço em restaurante', tipo: 'D'},
    	{ data: new Date(2015,6,7),  valor:  15.90, descricao: 'despesa de almoço em restaurante', tipo: 'D'},
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