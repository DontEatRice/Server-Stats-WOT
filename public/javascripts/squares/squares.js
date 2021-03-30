const colorPicker = ['rgba(230, 230, 0, 1)', 'rgb(102, 153, 255, 1)', 'rgb(153, 255, 102, 1)', 'rgb(255, 153, 51, 1)'];

const drawCharts = (stats, options) => {
    document.querySelector('#container');
    const labels = []
    const eu = []
    const ru = []
    const na = []
    const asia = []
    const dates = [];
    stats.forEach(element => {
        const date = new Date(element.date)
        dates.push(element.date);
        const month = date.getMonth()
        const day = date.getDate()
        labels.push(`${day < 10 ? '0' + day : day}.${month < 9 ? '0' + (month+1) : month+1}`)
        element.servers.forEach(server => {
            switch(server.name.toLowerCase()) {
                case 'eu':
                    eu.push(server.players);
                    break;
                case 'ru':
                    ru.push(server.players);
                    break;
                case 'na':
                    na.push(server.players);
                    break;
                case 'asia':
                    asia.push(server.players);
                    break;
                default:
                    console.error('invalid data');
                    break;    
            }
        })
    });
    for(let i = 0; i < stats[0].servers.length; i++) {
        const div = document.createElement('div');
        div.classList.add('chart-container');

        const canvas = document.createElement('canvas');
        div.appendChild(canvas);
        container.appendChild(div);

        let ctx = canvas.getContext('2d');
        let name = ''
        let players;
        switch(i) {
            case 0:
                name = 'EU';
                players = eu;
                break;
            case 1:
                name = 'RU';
                players = ru;
                break;
            case 2:
                name = 'NA';
                players = na;
                break;
            case 3:
                name = 'ASIA';
                players = asia;
                break;
        }
        const data = {
            labels: labels,
            datasets: [datasetsGenerator({name: name, data: players, color: colorPicker.pop(), hidden: false, lineTension: 0.1})]
        }
        new Chart(ctx, {type: 'line', data: data, options: options(dates, 'days')})
    }
}

const generateSelect = (mode) => {
    let divOptions = document.createElement('div')
    divOptions.classList.add('options')
    const spanChoose = document.createElement('span')
    spanChoose.textContent = 'Go to last 48hs server stats -> '
    divOptions.appendChild(spanChoose);
    const select = document.createElement('select');
    const defOption = document.createElement('option');
    defOption.value = '';
    defOption.textContent = 'Here';
    select.appendChild(defOption);
    const names = ['EU', 'RU', 'NA', 'ASIA'];
    names.forEach(element => {
        const option = document.createElement('option')
        option.value = element.toLowerCase();
        option.textContent = element;
        select.appendChild(option);
    })
    divOptions.appendChild(select)
    const span = document.createElement('span');
    span.textContent = ` Or check the last ${mode == 7 ? '31' : '7'} days stats `;
    const link = document.createElement('a')
    link.href = mode == 7 ? '/month' : '/week';
    link.textContent = 'here'
    span.appendChild(link)
    divOptions.appendChild(span)
    document.querySelector('#container').appendChild(divOptions);
    selectListener();
}

window.onload = async () => {
    const limit = window.location.pathname.slice(1) === 'week' ? 7 : 31;
    const response = await fetchData('day', 'limit', limit);
    if (!response.ok) {
        const block = document.querySelector('.block');
        block.classList.add('error');
        block.textContent = "Error in getting data from server!";
    } else {
        const stats = await response.json();
        stats.reverse();
        drawCharts(stats, options)
        generateSelect(limit)
    }
    document.querySelector('.loader').style.left = '100%';
    setTimeout(() => {
        document.querySelector('.loader').style.display = 'none';
    }, 600);
    
}