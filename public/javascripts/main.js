const options = (dates, mode = 'hours') => {
  return {
    maintainAspectRatio: false,
    stacked: false,
    responsive: true,
    hover: {
        mode: 'index',
        intersect: false
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      callbacks: {
        title: (tooltipItems) => {
          let s = new Date(dates[tooltipItems[0].index]);
          s.setMinutes(0, 0, 0);
          if (mode === 'hours') {   
            s = s.toLocaleString();
            return s;
          } else if (mode === 'days') {
            s = s.toDateString();
            return s;
          }
          s = s.toTimeString();
          return s;
        }
      }
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
}

const datasetsGenerator = (name, data, color, hidden) => {
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
    hidden: hidden
  }
}

const selectListener = () => {
  const select = document.querySelector('select')
  select.addEventListener('change', () => {
    window.location.href = window.location.origin + "/" + select.value.toLowerCase();
  })
}

const fetchData = async (type, arg, argValue) => {
  const response = await fetch(`/api?type=${type}&${arg}=${argValue}`);
  return response;
}