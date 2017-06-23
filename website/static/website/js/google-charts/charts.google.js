// google.charts.load('current', { packages: ['corechart', 'bar', 'table', 'treemap'] });
// // {#        google.charts.load('current', {'packages':['bar']});#}
//
// google.charts.setOnLoadCallback(getCouncilmansDebits);
// // google.charts.setOnLoadCallback(drawAnnotations);
// google.charts.setOnLoadCallback(drawTable);
// google.charts.setOnLoadCallback(drawChart);
// google.charts.setOnLoadCallback(drawBasic);


google.charts.load('current', {packages:['corechart', 'bar', 'controls']});
google.charts.setOnLoadCallback(getCouncilmansDebits);

function getCouncilmansDebits() {
    var total_debits = {};
    $.getJSON('api/v1/CouncilmanDebits/?format=json&limit=99999999', function (result) {
        $.each(result['objects'], function (key, val) {
            var councilman_name = val.councilman.name
            if(total_debits[councilman_name] == undefined) total_debits[councilman_name] = 0;
            total_debits[councilman_name] =  total_debits[councilman_name] + val.value;
            drawDashboard(total_debits);
        });
    });

    // drawChart(data);
    // drawStuff(data);
}

function drawDashboard(total_debits) {
    var data = new google.visualization.DataTable();
    data.addColumn("string", "Nome");
    data.addColumn("number", "Reembolso");

    $.each(total_debits, function (key, val) {
        data.addRow([key, val]);
    });
    data.sort({column: 1, desc: true});

    var dashboard = new google.visualization.Dashboard(document.getElementById('chart_dashboard'));

    var rangeSlider = new google.visualization.ControlWrapper({
          'controlType': 'NumberRangeFilter',
          'containerId': 'filter_div',
          'options': {
              'filterColumnLabel': 'Reembolso',
              'minValue': '0',
              'maxValue': '100000000'
          }
        });

    var stringFilter = new google.visualization.ControlWrapper({
      'controlType': 'StringFilter',
      'containerId': 'string_filter_div',
      'options': {
          'filterColumnLabel': 'Nome',
          'matchType': 'any'
      }
    });

    // Create a pie chart, passing some options
    var histogram = new google.visualization.ChartWrapper({
      'chartType': 'Histogram',
      'containerId': 'councilman_vertical_chart_most_cost',
      'options': {
        'title': 'Débitos de Vereadores do Munícipio de São Paulo',
        'colors': ['#f6a821'],
        'vAxis': { 'scaleType': 'mirrorLog' },
      }
    });

    dashboard.bind([rangeSlider,stringFilter],  histogram);

    // Draw the dashboard.
    dashboard.draw(data);
}

function drawChart(data) {
    var options = {
        title: 'Débitos de Vereadores do Munícipio de São Paulo',
        colors: ['#f6a821'],
        vAxis: { scaleType: 'mirrorLog' },
      };
    var chart = new google.visualization.Histogram(document.getElementById('councilman_vertical_chart_most_cost_2'));
    chart.draw(data, options);
}



function drawStuff(data) {
    var options = {
        title: 'Débitos de Vereadores do Munícipio de São Paulo',
        colors: ['#f6a821'],
      };

    var chart = new google.charts.Bar(document.getElementById('councilman_vertical_chart_most_cost'));
    chart.draw(data, options);
};

//
// function drawAnnotations() {
//     var data = new google.visualization.DataTable();
//     data.addColumn('timeofday', 'Time of Day');
//     data.addColumn('number', 'Motivation Level');
//     data.addColumn({ type: 'string', role: 'annotation' });
//     data.addColumn('number', 'Energy Level');
//     data.addColumn({ type: 'string', role: 'annotation' });
//
//     data.addRows([
//       [{ v: [8, 0, 0], f: '8 am' }, 1, '1', .25, '.2'],
//       [{ v: [9, 0, 0], f: '9 am' }, 2, '2', .5, '.5'],
//       [{ v: [10, 0, 0], f: '10 am' }, 3, '3', 1, '1'],
//       [{ v: [11, 0, 0], f: '11 am' }, 4, '4', 2.25, '2'],
//       [{ v: [12, 0, 0], f: '12 pm' }, 5, '5', 2.25, '2'],
//       [{ v: [13, 0, 0], f: '1 pm' }, 6, '6', 3, '3'],
//       [{ v: [14, 0, 0], f: '2 pm' }, 7, '7', 3.25, '3'],
//       [{ v: [15, 0, 0], f: '3 pm' }, 8, '8', 5, '5'],
//       [{ v: [16, 0, 0], f: '4 pm' }, 9, '9', 6.5, '6'],
//       [{ v: [17, 0, 0], f: '5 pm' }, 10, '10', 10, '10'],
//     ]);
//
//     var options = {
//         title: 'Motivation and Energy Level Throughout the Day',
//         annotations: {
//             alwaysOutside: true,
//             textStyle: {
//                 fontSize: 14,
//                 color: '#000',
//                 auraColor: 'none'
//             }
//         },
//         hAxis: {
//             title: 'Time of Day',
//             format: 'h:mm a',
//             viewWindow: {
//                 min: [7, 30, 0],
//                 max: [17, 30, 0]
//             }
//         },
//         vAxis: {
//             title: 'Rating (scale of 1-10)'
//         }
//     };
//
//     var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
//     chart.draw(data, options);
// }
//
// function drawTable() {
//     var data = new google.visualization.DataTable();
//     data.addColumn('string', 'CNPJ');
//     data.addColumn('string', 'Fornecedor');
//     data.addColumn('number', 'Ano');
//     data.addColumn('number', 'Mês');
//     data.addColumn('number', 'Valor');
//
//     data.addRows(7);
//     data.setCell(0, 0, '123456789-99');
//     data.setCell(0, 1, 'zezao do bar');
//     data.setCell(0, 2, 333);
//     data.setCell(0, 3, 2);
//     data.setCell(0, 4, 5550);
//
//     data.setCell(1, 0, '123456789-99');
//     data.setCell(1, 1, 'zezao do bar');
//     data.setCell(1, 2, 333);
//     data.setCell(1, 3, 2);
//     data.setCell(1, 4, 5550);
//
//     data.setCell(2, 0, '123456789-99');
//     data.setCell(2, 1, 'zezao do bar');
//     data.setCell(2, 2, 333);
//     data.setCell(2, 3, 2);
//     data.setCell(2, 4, 5550);
//
//     data.setCell(3, 0, '123456789-99');
//     data.setCell(3, 1, 'zezao do bar');
//     data.setCell(3, 2, 333);
//     data.setCell(3, 3, 2);
//     data.setCell(3, 4, 5550);
//
//     data.setCell(4, 0, '123456789-99');
//     data.setCell(4, 1, 'zezao do bar');
//     data.setCell(4, 2, 333);
//     data.setCell(4, 3, 2);
//     data.setCell(4, 4, 5550);
//
//     data.setCell(5, 0, '123456789-99');
//     data.setCell(5, 1, 'zezao do bar');
//     data.setCell(5, 2, 333);
//     data.setCell(5, 3, 2);
//     data.setCell(5, 4, 5550);
//
//     data.setCell(6, 0, '123456789-99');
//     data.setCell(6, 1, 'zezao do bar');
//     data.setCell(6, 2, 333);
//     data.setCell(6, 3, 2);
//     data.setCell(6, 4, 5550);
//
//
//
//
//     var table = new google.visualization.Table(document.getElementById('table_div'));
//
//     table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
// }
//
// function drawChart() {
//     var data = google.visualization.arrayToDataTable([
//       ['Location', 'Parent', 'Market trade volume (size)', 'Market increase/decrease (color)'],
//       ['Global', null, 0, 0],
//       ['America', 'Global', 0, 0],
//       ['Europe', 'Global', 0, 0],
//       ['Asia', 'Global', 0, 0],
//       ['Australia', 'Global', 0, 0],
//       ['Africa', 'Global', 0, 0],
//       ['Brazil', 'America', 11, 10],
//       ['USA', 'America', 52, 31],
//       ['Mexico', 'America', 24, 12],
//       ['Canada', 'America', 16, -23],
//       ['France', 'Europe', 42, -11],
//       ['Germany', 'Europe', 31, -2],
//       ['Sweden', 'Europe', 22, -13],
//       ['Italy', 'Europe', 17, 4],
//       ['UK', 'Europe', 21, -5],
//       ['China', 'Asia', 36, 4],
//       ['Japan', 'Asia', 20, -12],
//       ['India', 'Asia', 40, 63],
//       ['Laos', 'Asia', 4, 34],
//       ['Mongolia', 'Asia', 1, -5],
//       ['Israel', 'Asia', 12, 24],
//       ['Iran', 'Asia', 18, 13],
//       ['Pakistan', 'Asia', 11, -52],
//       ['Egypt', 'Africa', 21, 0],
//       ['S. Africa', 'Africa', 30, 43],
//       ['Sudan', 'Africa', 12, 2],
//       ['Congo', 'Africa', 10, 12],
//       ['Zaire', 'Africa', 8, 10]
//     ]);
//
//     tree = new google.visualization.TreeMap(document.getElementById('chart_hot'));
//
//     tree.draw(data, {
//         minColor: '#f00',
//         midColor: '#ddd',
//         maxColor: '#0d0',
//         headerHeight: 15,
//         fontColor: 'black',
//         showScale: true
//     });
//
// }
//
// function drawBasic() {
//
//     var data = google.visualization.arrayToDataTable([
//       ['CNPJ', 'Mais Apontados', ],
//       ['CNPJ1', 8175000],
//       ['CNPJ2', 3792000],
//       ['CNPJ3', 2695000],
//       ['CNPJ4', 2099000],
//       ['CNPJ5', 1526000]
//     ]);
//
//     var options = {
//         title: 'CNPJs que mais geraram notas',
//         chartArea: { width: '50%' },
//         hAxis: {
//             title: 'Somatória em Reais',
//             minValue: 0
//         },
//         vAxis: {
//             title: ''
//         }
//     };
//
//     var chart = new google.visualization.BarChart(document.getElementById('chart_cnpj'));
//
//     chart.draw(data, options);
// }