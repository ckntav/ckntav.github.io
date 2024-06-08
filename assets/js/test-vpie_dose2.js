Highcharts.setOptions({
    colors: ["#F21A00", "#ED3F00", "#E96400", "#E58900", "#E1AF00", "#E3B60A", "#E5BD15", "#E8C41F", "#EBCC2A", "#CEC650", "#B1C177", "#94BC9E", "#78B7C5", "#68AFC0", "#59A8BB", "#4AA1B6", "#3B9AB2"]
});

Highcharts.chart('htmlwidget-vpie-dose2', {
    chart: {
        type: 'variablepie',
    },
    title: {
        text: "Couverture vaccinale par tranches d'âge (2 doses) au Québec",
        align: "left"
    },
    subtitle: {
        text: 'En date du 10 juillet 2021',
        align: "left"
    },
    credits: {
        enabled: true,
        text: 'VaccinTrackerQC.ca | @vaccintrackerqc',
        href: 'https://vaccintrackerqc.ca/'
    },
    tooltip: {
        headerFormat: '',
        pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
            'Population: <b>{point.y}</b><br/>' +
            '% (2 doses): <b>{point.z} %</b><br/>'
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '<p style="font-size:12px;font-weight:normal;color:#6f777d">{point.name}</p><br>{point.z:.2f} %'
            }
        },
        variablepie: {
            startAngle: 115
        }
    },
    series: [{
        minPointSize: 10,
        innerSize: '0%',
        zMin: 0,
        zMax:100,
        name: 'countries',
        data: [{
            name: '85 ans et plus',
            y: 217191,
            z: 80.21
        }, {
            name: '80-84 ans',
            y: 208329,
            z: 82.88
        }, {
            name: '75-79 ans',
            y: 330534,
            z: 80.92
        }, {
            name: '70-74 ans',
            y: 452595,
            z: 79.62
        }, {
            name: '65-69 ans',
            y: 541859,
            z: 73.97
        }, {
            name: '60-64 ans',
            y: 626995,
            z: 65.98
        }, {
            name: '55-59 ans',
            y: 622036,
            z: 53.74
        }, {
            name: '50-54 ans',
            y: 541859,
            z: 45.18
        }, {
            name: '45-49 ans',
            y: 533147,
            z: 40.06
        }, {
            name: '40-44 ans',
            y: 586099,
            z: 30.16
        }, {
            name: '35-39 ans',
            y: 564724,
            z: 25.97
        }, {
            name: '30-34 ans',
            y: 553905,
            z: 21.43
        }, {
            name: '25-29 ans',
            y: 551976,
            z: 18.62
        }, {
            name: '18-24 ans',
            y: 664464,
            z: 15.36
        }, {
            name: '12-17 ans',
            y: 529446,
            z: 2.84
        }, {
            name: '0-11 ans',
            y: 1079338,
            z: 0.01
        }]
    }]
});