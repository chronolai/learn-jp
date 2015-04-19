/*
	平　假 - ひらがな(hiragana)
	片　假 - かたかな(katakana)

	清　音 - せいおん(seion)
	濁　音 - だくおん(dakuon)
	半濁音 - はんだくおん(handakuon)
	拗　音 - ようおん(youon)
*/

angular.module('learnJPApp', [])
    .controller('LearnJPController', function($scope, $http) {

        $scope.setOption = function(name, count) {
            if (count > 1 || (count >= 1 && $scope[name] == false)) {
                $scope[name] = !$scope[name];
            } else {
                Materialize.toast('At least one!', 3000);
            };
            $scope.randQuestion();
        };
        $scope.setType = function(name) {
            var count = $scope.hiragana + $scope.katakana + $scope.romaji;
            $scope.setOption(name, count);
        };
        $scope.setSpell = function(name) {
            var count = $scope.seion + $scope.dakuon + $scope.handakuon + $scope.youon;
            $scope.setOption(name, count);
        };
        $scope.checkAnswer = function(answer) {
        	if (answer === $scope.question.answer) {
        		$scope.randQuestion();
        	} else {
                Materialize.toast('Wrong answer!', 3000);
        	};
        };

        // init
        $scope.initCheckbox = function() {
            $scope.hiragana = true;
            $scope.katakana = false;
            $scope.romaji = false;

            $scope.seion = true;
            $scope.dakuon = false;
            $scope.handakuon = false;
            $scope.youon = false;
        };
        $scope.randQuestion = function() {
            var random_list = [];
            if ($scope.seion) {
                random_list = random_list.concat($scope.japanese.seion);
            };
            if ($scope.dakuon) {
                random_list = random_list.concat($scope.japanese.dakuon);
            };
            if ($scope.handakuon) {
                random_list = random_list.concat($scope.japanese.handakuon);
            };
            if ($scope.youon) {
                random_list = random_list.concat($scope.japanese.youon);
            };

            var type_list = [];
            if ($scope.hiragana) {
                type_list.push('hiragana');
            };
            if ($scope.katakana) {
                type_list.push('katakana');
            };
            if ($scope.romaji) {
                type_list.push('romaji');
            };


            random_list = shuffle(random_list);
            type_list = shuffle(type_list);


            $scope.question = random_list[0];
            $scope.question.display = $scope.question[type_list[0]];

            if (type_list[0] == 'romaji') {
            	answer_type = ['hiragana', 'katakana'];
            } else {
            	answer_type = ['romaji']
            };
            answer_type = shuffle(answer_type);

            var answer_list = [];
            answer_list[0] = random_list[0][answer_type[0]];
            answer_list[1] = random_list[1][answer_type[0]];
            answer_list[2] = random_list[2][answer_type[0]];
            answer_list[3] = random_list[3][answer_type[0]];
            answer_list = shuffle(answer_list);
            $scope.answers = answer_list;
            $scope.question.answer = $scope.question[answer_type[0]];
        };

        $http.get('japanese.json')
            .success(function(data) {
                $scope.japanese = {};
                data.map(function(row) {
                    if (!$scope.japanese[row[0]]) {
                        $scope.japanese[row[0]] = [];
                    };
                    $scope.japanese[row[0]].push({
                        type: row[0],
                        romaji: row[1],
                        hiragana: row[2],
                        katakana: row[3],
                    });
                });
                $scope.initCheckbox();
                $scope.randQuestion();
            })
            .error(function(data, status, error, config) {
                console.log("Load JSON error");
            });


    });

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
$(document).ready(function() {
    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'right', // Choose the horizontal origin
        // closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
})