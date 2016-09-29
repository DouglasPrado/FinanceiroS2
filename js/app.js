angular.module('app', ['ngMessages']).controller('appController', function( $scope ){

	$scope.tipoTransacao = { transacao: 'Depositar' };
	$scope.meses = [
		{mes: "Janeiro"},{mes:"Fevereiro"},{mes:"Março"},{mes:"Abril"},{mes:"Maio"},{mes:"Junho"},{mes:"Julho"},{mes:"Agosto"},{mes:"Setembro"},{mes:"Outubro"},{mes:"Novembro"},{mes:"Dezembro"}
	];

	$scope.transacoes = [
		{movimento:"Depositar", valor:175, mes:"Janeiro"},
		{movimento:"Sacar", valor:-189, mes:"Janeiro"},
		{movimento:"Depositar", valor:169.50, mes:"Janeiro"},
		{movimento:"Sacar", valor:-175, mes:"Março"},
		{movimento:"Sacar", valor:-157, mes:"Fevereiro"},
		{movimento:"Depositar", valor:14.20, mes:"Março"},
		{movimento:"Sacar", valor:-47, mes:"Janeiro"},
		{movimento:"Depositar", valor:53.57, mes:"Abril"},
		{movimento:"Depositar", valor:95, mes:"Maio"},
		{movimento:"Sacar", valor:-47, mes:"Agosto"},
		{movimento:"Depositar", valor:175, mes:"Setembro"},
	];
	$scope.total = 0;

	$scope.calculaTransacao = function ( selecionaMes ){
		$scope.total = 0;
		var transacoes = $scope.transacoes;
		for(var x = 0; x < transacoes.length ; x++){
			if( selecionaMes == transacoes[x].mes ){
				$scope.total = $scope.total + transacoes[x].valor;	
			}
		}
	}
	/*
		Precisei inserir tres parametros, porque precisava que o radio e o select funcionasse independente
	*/
	$scope.inserirTransacao = function( transacao, selecionaMes, tipoTransacao ){
		transacao =	{movimento:tipoTransacao.transacao, valor: transacao.valor ,mes:selecionaMes.mes};
		if( transacao.movimento == 'Depositar' ){
			somaTransacao( transacao );
		}else{
			transacao.valor = transacao.valor * -1;
			subtraiTransacao( transacao );
		}
		$scope.transacoes.push( transacao );
		delete $scope.transacao;           
	    $scope.transacaoForm.$setPristine();
	    $scope.transacaoForm.$setUntouched();
	};

	$scope.excluirTransacao = function( movimento ){
		var excluitransacao = $scope.transacoes.indexOf( movimento );
		$scope.transacoes.splice( excluitransacao, 1 );	
		$scope.calculaTransacao( movimento.mes );	
	}



	somaTransacao = function( movimento ){
		$scope.total = $scope.total + movimento.valor;		
	}
	
	subtraiTransacao = function( movimento ){
		$scope.total = $scope.total - movimento.valor*-1;
	}


});