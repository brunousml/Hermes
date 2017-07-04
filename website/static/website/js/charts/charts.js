
// Load Google Charts
google.charts.load('current', {packages:['treemap']});
google.charts.setOnLoadCallback(drawCharts);


// Get JSON Data and Create Charts
function drawCharts() {
    $.getJSON('api/v1/CouncilmanDebits/?format=json&limit=99999999', function (result) {
        createHorizontalBarChart(sumDebitsByCNPJ(result['objects']));
        createTreeMapChart(sumDebitsByCostObject(result['objects']));
        createBarChart(sumDebitsByCouncilman(result['objects']));
        createDataTable(result['objects']);
    });
}

function createDataTable(objects) {
    var table = $('#datatable');

    $.each(objects, function (k, v) {
        table.append(addRow(v));
    });

    var extensions = {
        "sFilter": "dataTables_filter col-xs-12",
        "sLength": "dataTables_length col-xs-12"
    }
    // Used when bJQueryUI is false
    $.extend($.fn.dataTableExt.oStdClasses, extensions);
    // Used when bJQueryUI is true
    $.extend($.fn.dataTableExt.oJUIClasses, extensions);

    table.DataTable();
}

function addRow(debit) {
    return '<tr> '+
                '<td>' + debit.councilman.name + '</td>' +
                '<td>' + debit.department + '</td>' +
                '<td>' + debit.cost_object + '</td>' +
                '<td>' + debit.cost_center_code + '</td>' +
                '<td>' + debit.provider + '</td>' +
                '<td>' + debit.cnpj + '</td>' +
                '<td>' + debit.year + '</td>' +
                '<td>' + debit.month + '</td>' +
                '<td>' + debit.value + '</td>' +
            '</tr>';
}

function createHorizontalBarChart(debits) {
    var data = [];
    var labels = [];
    var backgroundcolor = [];
    var bordercolor = [];
    var limit = 20;

    var count = 0;
    $.each(debits, function (key, val) {
        if (count <= limit){ // used to limit the cnpj per graph
            data.push(val.toFixed(2));
            labels.push(key);
            backgroundcolor.push(get_rgb_randon())
            bordercolor.push(get_rgb_randon_border())
        }
        count++;
    });

    var ctx = document.getElementById("horizontalBarChart");
    var stackedBar = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: labels,
            datasets: [{
                label: 'R$ ',
                data: data,
                backgroundColor: backgroundcolor,
                borderColor: bordercolor,
                borderWidth: 1
            }],
        },
        options: {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });
}

// Bar Chart using ChartJS
function createBarChart(debits_by_councilman) {
    var data = [];
    var labels = [];
    var backgroundcolor = [];
    var bordercolor = [];

    $.each(debits_by_councilman, function (key, val) {
        data.push(val.toFixed(2));
        labels.push(key);
        backgroundcolor.push(get_rgb_randon())
        bordercolor.push(get_rgb_randon_border())
    });

    var ctx = document.getElementById("barChart");
    var stackedBar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'R$ ',
                data: data,
                backgroundColor: backgroundcolor,
                borderColor: bordercolor,
                borderWidth: 1
            }],
        },
        options:[]
    });
}

// TreeMap Chart using GoogleCharts
function createTreeMapChart(total_debits) {
    var data = new google.visualization.DataTable();

    data.addColumn("string", "Objecto de custo");
    data.addColumn("string", "CNPJ");
    data.addColumn("number", "Reembolso");
    data.addRow([ 'Objecto de Custo', null, 0]);

    var exist= {};
    $.each(total_debits, function (root, nodes){
        data.addRow([ root, 'Objecto de Custo', 0]);
        $.each(nodes, function (councilman, cnpjs){
            if(!exist[councilman]){
                exist[councilman]=true;
                data.addRow([councilman, root, 0]);
            }
            $.each(cnpjs, function (cnpj, value){
                value = Math.round(value);
                if(exist[cnpj]){
                    data.addRow([null, cnpj, value]);
                }else{
                    exist[cnpj] =true
                    data.addRow([cnpj, councilman, value]);
                }
            });
        });
    });

    tree = new google.visualization.TreeMap(document.getElementById('treemapChart'));
    var options = {
        highlightOnMouseOver: true,
        maxDepth: 1,
        maxPostDepth: 2,
        minHighlightColor: '#8c6bb1',
        midHighlightColor: '#9ebcda',
        maxHighlightColor: '#edf8fb',
        minColor: '#009688',
        midColor: '#f7f7f7',
        maxColor: '#ee8100',
        headerHeight: 15,
        showScale: true,
        height: 500,
        useWeightedAverageForAggregation: true,
        generateTooltip: showStaticTooltip
      };

    tree.draw(data, options);

}
function showStaticTooltip(row, value, size) {
    return '<div style="background:#fd9; padding:10px; border-style:solid"> R$ '+ value +'</div>';
}

/// Helpers
function get_rgb_randon() {
     var a = [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ];
    return a[Math.floor(Math.random()*a.length)];
}

function get_rgb_randon_border() {
    var a =  [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ];
    return a[Math.floor(Math.random()*a.length)];
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

function sumDebitsByCostObject(objects) {
    var total_debits = {};
    $.each(objects, function (key, val) {
        var cost_object = val.cost_object;
        var cnpj = val.cnpj;
        var councilman = val.councilman.name;

        if(total_debits[cost_object] == undefined) total_debits[cost_object] = {};
        if(total_debits[cost_object][councilman] == undefined) total_debits[cost_object][councilman] = {};
        if(total_debits[cost_object][councilman][cnpj] == undefined) total_debits[cost_object][councilman][cnpj] = 0;

        total_debits[cost_object][councilman][cnpj] =  total_debits[cost_object][councilman][cnpj] + val.value;
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

    $.each(objects, function (key, val) {
        var councilman_name = val.councilman.name
        total_debits[councilman_name] =  total_debits[councilman_name] + val.value;
    });

    return total_debits
}