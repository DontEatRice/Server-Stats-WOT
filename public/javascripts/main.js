stats.reverse();
const colors = ["rgba(255,99,132,1)", "rgba(103, 181, 190, 1)"]

let labels = []
let players = []
let names = []
let players_sum = []
for(let i = 0; i<stats[0].servers.length; i++) {
  players.push([])
}
stats[0].servers.forEach(server => {
  names.push(server.name)
})

stats.forEach((value, index) => {
  let date = new Date(value.date);
  if (date.getHours() === 23)
    labels.push(`${date.getDate()}.${date.getMonth() < 9 ? '0'+(date.getMonth()+1): date.getMonth()+1} ${date.getHours() < 10 ? '0'+date.getHours(): date.getHours()}`);
  else
    labels.push(`${date.getHours() < 10 ? '0'+date.getHours(): date.getHours()}`)
  let sum = 0;
  value.servers.forEach((server, index) => {
    sum += server.players
    players[index].push(server.players)
  })
  players_sum.push(sum)
});

const datasetsGenerator = (name, data, color) => {
  return {
    label: name,
    borderColor: color,
    fill: false,
    backgroundColor: color,
    borderWidth: 3,
    hoverBackgroundColor: color,
    hoverBorderColor: color,
    data: data,
    pointRadius: 3,
    pointHoverRadius: 6,
    hidden: name === 'sum' ? false : true
  }
}

let datasets = []
names.forEach((name, index)=> {
  datasets.push(datasetsGenerator(name, players[index], colors[index]))
})
datasets.push(datasetsGenerator('sum', players_sum, "rgba(236, 71, 233, 1)"))


const data = {
    labels: labels,
    // datasets: [{
    //   label: "EU1",
    //   borderColor: "rgba(255,99,132,1)",
    //   fill: false,
    //   backgroundColor: "rgba(255,99,132,1)",
    //   borderWidth: 3,
    //   hoverBackgroundColor: "rgba(255,99,132,1)",
    //   hoverBorderColor: "rgba(255,99,132,1)",
    //   data: EU1Stats,
    //   pointRadius: 3,
    //   pointHoverRadius: 6,
    // },
    // {
    //   label: "EU2",
    //   borderColor: "rgba(103, 181, 190, 1)",
    //   borderWidth: 3,
    //   hoverBackgroundColor: "rgba(103, 181, 190, 1)",
    //   hoverBorderColor: "rgba(103, 181, 190, 1)",
    //   data: EU2Stats,
    //   pointRadius: 3,
    //   fill: false,
    //   backgroundColor: "rgba(103, 181, 190, 1)",
    //   pointHoverRadius: 6,
    // }]
    datasets: datasets
};
  
const options = {
    maintainAspectRatio: false,
    stacked: false,
    responsive: true,
    hover: {
        mode: 'index',
        intersect: false
    },
    tooltips: {
      mode: 'index',
      intersect: false
    },
    scales: {
      yAxes: [{
        stacked: false,
        gridLines: {
          display: true,
          color: "rgba(255,255,255,0.7)",
          drawBorder: true,
          drawOnChartArea: false,
        },
        ticks: {
          fontColor: "#FFF"
        }
      }],
      xAxes: [{
        gridLines: {
          display: true,
          drawBorder: true,
          color: "rgba(255,255,255,0.7)",
          drawOnChartArea: false
        },
        ticks: {
          fontColor: "#FFF"
        }
      }]
    }
};
  
  Chart.Line('chart', {
    options: options,
    data: data
  });
