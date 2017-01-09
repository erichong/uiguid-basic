var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid.importer', 'ui.grid','ui.grid.edit','ui.grid.pagination', 'ui.grid.selection', 'ui.grid.grouping','ui.grid.autoResize','ui.grid.resizeColumns','ui.grid.autoFitColumns', 'ui.grid.exporter']);

// app.controller('MainCtrl', ['$scope', '$http','i18nService','uiGridExporterConstants','uiGridExporterService','uiGridGroupingConstants','uiGridConstants', function ($scope, $http,  uiGridGroupingConstants, uiGridExporterConstants, uiGridExporterService) {
app.controller('MainCtrl', ['$scope', '$http','i18nService','uiGridGroupingConstants','uiGridConstants', function ($scope, $http,  uiGridGroupingConstants, uiGridExporterConstants, uiGridExporterService) {

  //                            uiGridGroupingConstants    'uiGridConstants' conflict with uiExporterService
// app.controller('MainCtrl', ['$scope', '$http','uiGridConstants','uiGridExporterConstants','uiGridExporterService', function ($scope, $http,uiGridExporterConstants,uiGridExporterService) {

                              $scope.exportCSV = function(){
                                var exportService=uiGridExporterService;
                                var grid=$scope.gridApi.grid;
                                var fileName="s.csv";


                                exportService.loadAllDataIfNeeded(grid, uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE).then(function() {
                                  var exportColumnHeaders = exportService.getColumnHeaders(grid, uiGridExporterConstants.VISIBLE);
                                  var exportData = exportService.getData(grid, uiGridExporterConstants.ALL, uiGridExporterConstants.VISIBLE);
                                  var csvContent = exportService.formatAsCsv(exportColumnHeaders, exportData, grid.options.exporterCsvColumnSeparator);
                                  exportService.downloadFile(fileName, csvContent, grid.options.exporterOlderExcelCompatibility);
                                });
                              };


                              $scope.data = []; //angular.element(document.getElementById('yourElementId')).scope()
                              $scope.lang = 'ja';


                              $scope.gridOptions1 = {
                                treeRowHeaderAlwaysVisible: false,
                                paginationPageSizes: [25, 50, 70],
                                paginationPageSize: 25,
                                //rowHeight: 50,
                                enableColumnResizing: true,
                                enableSorting: true,
                                enableFiltering: true,
                                enableRowSelection: true,
                                enableSelectAll: true,
                                selectionRowHeaderWidth: 35,
                                showGridFooter:true,
                                multiSelect: true,
                                //enableAutoFitColumns: true,
                                enableGridMenu: true,
                                data: 'data',
                                importerDataAddCallback: function( grid, newObjects ) {
                                  $scope.data = $scope.data.concat( newObjects );
                                },
                                onRegisterApi: function(gridApi){
                                  $scope.gridApi = gridApi;
                                },

                                columnDefs: [
                                  //         {field:"MASTER-AIR-WAYBILL-NO.", grouping: { groupPriority: 0 }, sort: { priority: 0, direction: 'asc' }},
                                  {field:"mawb",minWidth: 80}, //color to show etd/eta on time, click to show detail
                                  {field:"flight"},
                                  {field:"date",type: 'date', cellFilter: 'date:"yyyy/MM/dd"'},
                                  {field:"hawb"},
                                  {field:"pcs"},
                                  {field:"gw"},
                                  {field:"unit"},
                                  {field:"desc"},
                                  {field:"consignee"},
                                  {field:"cons-addr"},
                                  {field:"tel"},
                                  {field:"shipper"},
                                  {field:"shipper-addr"},
                                  {field:"currency"},
                                  {field:"value"},
                                  {field:"origin"},
                                  {field:"cons-zip"},
//                                   {field:"li-name"},
//                                   {field:"li-pcs"},
//                                   {field:"li-unitpirce"},
//                                   {field:"li-link"}
                                ]
                              };

                              $scope.deleteSelected = function(){
                                angular.forEach($scope.gridApi.selection.getSelectedRows(), function (data, index) {
                                  $scope.data.splice($scope.data.lastIndexOf(data), 1);
                                });

                              };


                              //  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
                              $http.get('')
                              //       $http.get('/data/100.json')
                              .success(function(data) {
                                $scope.gridOptions1.data = data;
                              });

}]);
