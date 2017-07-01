var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

	var inputCarro = document.getElementById('carroText');
	var inputFabricante = document.getElementById('fabricanteText');
	var inputModelo = document.getElementById('modeloText');
	var inputAno = document.getElementById('anoText');
	document.getElementById('addBtn').setAttribute("disabled","disabled");

	var refresh = function(){
		$http.get("/carroslist").then(function (success){
			$scope.carroslist = success.data;
			$scope.carro = {};
		},function (error){

		});
	}

	refresh();

	$scope.addCarro = function(){
		if(check()){
			$http.post("/carroslist", $scope.carro).then(function (success){
				alertify.success('Adicionado!');
				refresh();
			},function (error){

			});
		}
	}

	$scope.removeCarro = function(id){
		alertify.confirm('Confirmar remoção', 'Tem certeza que deseja remover?', function(){ 
			$http.delete('/carroslist/'+id).then(function (success){
				alertify.success('Removido!');
				refresh();
			},function (error){

			}); 
		}, function(){ alertify.error('Cancelado!')});
	}

	$scope.editCarro = function(id){
		$http.get('/carroslist/'+id).then(function (success){
			$scope.carro = success.data;
		},function (error){

		});
		document.getElementById('addBtn').removeAttribute("disabled");
	}

	$scope.updateCarro = function(){
		if(check()){
			$http.put('/carroslist/'+ $scope.carro._id, $scope.carro).then(function (success){
				refresh();
			},function (error){

			});
			alertify.success('Editado!');
			document.getElementById('addBtn').setAttribute("disabled","disabled");
		}
	}

	$scope.gerarRelatorio = function(){
		$http.get("/carroslist").then(function (success){
			var cont = 0;
			var doc = new jsPDF();
			var relatorio = 'Relatorio de Carros\n\n';
			for (var i=0; i < success.data.length; i++) {
				relatorio += (i+1) + '.\n';
				relatorio += '   Carro: ' + JSON.stringify(success.data[i].carro).slice( 1 ).replace(/.$/,'') + "\n";
				relatorio += '   Fabricante: ' + JSON.stringify(success.data[i].fabricante).slice( 1 ).replace(/.$/,'') + "\n";
				relatorio += '   Modelo: ' + JSON.stringify(success.data[i].modelo).slice( 1 ).replace(/.$/,'') + "\n";
				relatorio += '   Ano: ' + JSON.stringify(success.data[i].ano).slice( 1 ).replace(/.$/,'') + "\n\n";
				cont++;
				if(cont > 6){
					doc.text(relatorio, 10, 10);
					doc.addPage();
					relatorio = '';
					cont = 0;
				}
			}
			doc.text(relatorio, 10, 10);
			doc.save('relatorio.pdf');
			alertify.success('Relatorio gerado!');
		},function (error){

		});
	}

	$scope.clear = function(){
		$scope.carro = {};
		alertify.success('Os campos foram limpos!');
	}

	function check(){
		if(inputCarro.value == ''){
			inputCarro.focus();
			alertify.alert('Falha ao cadastrar! O campo Carro deve ser preenchido!').set('title','Falha');
			return false;
		}else if(inputFabricante.value == ''){
			inputFabricante.focus();
			alertify.alert('Falha ao cadastrar! O campo Fabricante deve ser preenchido!').set('title','Falha');
			return false;
		}else if(inputModelo.value == ''){
			inputModelo.focus();
			alertify.alert('Falha ao cadastrar! O campo Modelo deve ser preenchido!').set('title','Falha');
			return false;
		}else if(inputAno.value == ''){
			inputAno.focus();
			alertify.alert('Falha ao cadastrar! O campo Ano deve ser preenchido!').set('title','Falha');
			return false;
		}else{
			return true;
		}
	}
}]);