'use strict';

angular.module('AnimalTFDB3')
    .controller('DownloadController', DownloadController);

function DownloadController($scope) {
    console.log("DownloadController loaded");
    $(document).ready(function () {
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
        });
    });
}