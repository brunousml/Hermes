// google.charts.load('current', { packages: ['corechart', 'bar', 'table', 'treemap'] });
// // {#        google.charts.load('current', {'packages':['bar']});#}
//
// google.charts.setOnLoadCallback(getCouncilmansDebits);
// // google.charts.setOnLoadCallback(drawAnnotations);
// google.charts.setOnLoadCallback(drawTable);
// google.charts.setOnLoadCallback(drawChart);
// google.charts.setOnLoadCallback(drawBasic);

var $colors = '#f6a821';
google.charts.load('current', {packages:['corechart', 'bar', 'controls','scatter']});
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
    $.getJSON('api/v1/CouncilmanDebits/?format=json&limit=99999999', function (result) {
        drawDashboard(sumDebitsByCouncilman(result['objects']));
        drawScatterChart(sumDebitsByCostObject(result['objects']));
        drawBasic(sumDebitsByCNPJ(result['objects']));
    });
}
function sumDebitsByCNPJ(objects) {
    var total_debits = {};
    $.each(objects, function (key, val) {
        var CNPJ = val.cnpj;
        if(total_debits[CNPJ] == undefined) total_debits[CNPJ] = 0;
        total_debits[CNPJ] =  total_debits[CNPJ] + val.value;
    });

    return total_debits
}

function drawBasic(total_debits) {

    var data = new google.visualization.DataTable();
    data.addColumn("string", "CNPJ");
    data.addColumn("number", "Reembolso");

    $.each(total_debits, function (object, value) {
        data.addRow([ object, value]);
    })

      var options = {
        title: 'Relação de Pagamentos para CNPJ',
        // chartArea: {width: '50%'},
        hAxis: {
          title: 'Total em Reais',
          minValue: 0
        },
        vAxis: {
          title: 'CNPJ'
        }
      };

      var chart = new google.visualization.BarChart(document.getElementById('chart_cnpj'));

      chart.draw(data, options);
    }


function drawScatterChart(total_debits) {
    var data = new google.visualization.DataTable();
    data.addColumn("string", "Objeto de custo");
    data.addColumn("number", "Reembolso");

    $.each(total_debits, function (object, value) {
        data.addRow([ object, value]);
    })

    var options = {
        title: 'Objetos de Custo',
        legend: 'none',
        // aggregationTarget: 'auto',
        colors: [$colors],
        fontSize: 2,
        chart: {
            title: 'Students\' Final Grades',
            subtitle: 'based on hours studied'
          },
          hAxis: {title: 'Hours Studied'},
          vAxis: {title: 'Grade'},
        selectionMode: 'multiple',
    };

    var chart = new google.charts.Scatter(document.getElementById('tree_map'));

        chart.draw(data, google.charts.Scatter.convertOptions(options));

}



function sumDebitsByCostObject(objects) {
    var total_debits = {};
    $.each(objects, function (key, val) {
        var cost_object = val.cost_object;
        if(total_debits[cost_object] == undefined) total_debits[cost_object] = 0;
        total_debits[cost_object] =  total_debits[cost_object] + val.value;
    });

    return total_debits
}

function sumDebitsByCouncilman(objects) {
    var total_debits = {};
    $.each(objects, function (key, val) {
        var councilman_name = val.councilman.name
        if(total_debits[councilman_name] == undefined) total_debits[councilman_name] = 0;
        total_debits[councilman_name] =  total_debits[councilman_name] + val.value;
    });

    return total_debits
}

function drawDashboard(total_debits) {
    var data = new google.visualization.DataTable();
    data.addColumn("string", "Vereador");
    data.addColumn("number", "Reembolso");

    $.each(total_debits, function (key, val) {
        data.addRow([key, val]);
    });
    data.sort({column: 1, desc: true});

    var dashboard = new google.visualization.Dashboard(document.getElementById('chart_dashboard'));

    var rangeSlider = new google.visualization.ControlWrapper({
          'controlType': 'NumberRangeFilter',
          'containerId': 'filter_div',
          'lowValue' : 0,
          'maxValue': 10000000,
          'options': {
              'filterColumnLabel': 'Reembolso'
          }
        });

    var stringFilter = new google.visualization.ControlWrapper({
      'controlType': 'StringFilter',
      'containerId': 'string_filter_div',
      'options': {
          'filterColumnLabel': 'Vereador',
          'matchType': 'any'
      }
    });

    var histogram = new google.visualization.ChartWrapper({
      'chartType': 'Histogram',
      'containerId': 'councilman_vertical_chart_most_cost',
      'options': {
        'title': 'Débitos de Vereadores do Munícipio de São Paulo',
        'colors': ['#f6a821'],
        'vAxis': { 'scaleType': 'mirrorLog' },
      }
    });

    dashboard
        .bind(rangeSlider,  histogram)
        .bind(stringFilter, histogram);


    // Draw the dashboard.
    dashboard.draw(data);
}