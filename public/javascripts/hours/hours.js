const colors = ["rgba(255,99,132,1)", "rgba(103, 181, 190, 1)"]

const setExampleData = (stats) => {
    let structure = []
    stats[0].servers.forEach(server => {
      structure.push(server.name)
    })
    stats.forEach(stat => {
      if(stat.servers.length > structure.length){
        structure = []
        stat.servers.forEach(server => {
          structure.push(server.name)
        })
      }
    })
    return structure
} 
  
const makeValid = (stats, example) => {
    stats.forEach(stat => {
        if (stat.servers.length !== example.length) {
            for(let i = 0; i < example.length; i++) {
                if (stat.servers[i].name != example[i]) {
                stat.servers.splice(i, 0, {players: NaN, name: example[i]})
                }
            }
        }
    })
}
const randomInt = (n) => {
    return Math.floor(Math.random()*n)
}

const randomColor = () => {
    const r = randomInt(256)
    const g = randomInt(256)
    const b = randomInt(256)
    return `rgba(${r}, ${g}, ${b}, 1)`  
}

const getStuffForChart = (stats) => {
    let labels = []
    let players = []
    let players_sum = []
    let dates = []
    const example = setExampleData(stats)
    makeValid(stats, example)
    for(let i = 0; i<example.length; i++) {
      players.push([])
    }
  
    stats.forEach((value, index) => {
      let date = new Date(value.date);
      dates.push(date);
      if (date.getHours() === 23)
        labels.push(`${date.getDate()}.${date.getMonth() < 9 ? '0'+(date.getMonth()+1): date.getMonth()+1} ${date.getHours() < 10 ? '0'+date.getHours(): date.getHours()}`);
      else
        labels.push(`${date.getHours() < 10 ? '0'+date.getHours(): date.getHours()}`)
      let sum = 0;
      value.servers.forEach((server, index) => {
        sum += isNaN(server.players) ? 0 : server.players;
        players[index].push(server.players)
      })
      players_sum.push(sum)
    });
  
  
  
    let datasets = []
    example.forEach((name, index)=> {
      datasets.push(datasetsGenerator(name, players[index], index >= colors.length ? randomColor() : colors[index], true))
    })
    datasets.push(datasetsGenerator('sum', players_sum, "rgba(236, 71, 233, 1)", false))
  
    const data = {
      labels: labels,
      datasets: datasets
    };
  
    return [data, dates]
}


stats.reverse();

window.onload = () => {
    stats.reverse();
    const [stuff, dates] = getStuffForChart(stats);
    Chart.Line('chart', {
        options: options(dates),
        data: stuff
    });
    selectListener()
}
  
  