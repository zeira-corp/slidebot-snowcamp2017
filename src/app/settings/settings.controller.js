(function () {
  'use strict';

  angular
    .module('app')
    .controller('SettingsController', SettingsController);

  SettingsController.$inject = ['$log', '$state', 'Settings', 'locales', 'luisApplications'];

  function SettingsController($log, $state, Settings, locales, luisApplications) {
    var vm = this;
    vm.languages = ['en', 'fr'];
    vm.sttEngines = [{
      name: 'Microsoft BingSpeech',
      service: 'BingSpeech'
    }];
    vm.ttsEngines = [{
      name: 'Microsoft BingSpeech',
      service: 'BingSpeech'
    }];
    vm.nlpEngines = [{
      name: 'Microsoft Luis',
      service: 'Luis'
    }];
    vm.genders = ['female', 'male'];
    vm.save = save;
    vm.reset = reset;
    vm.settings = Settings.load();
    vm.locales = locales;
    vm.luisApplciations = luisApplications;

    function save() {
      Settings.save(vm.settings);
      $state.go('home');
    }

    function reset() {
      Settings.reset();
      $state.go('home');
    }
  }
})();
