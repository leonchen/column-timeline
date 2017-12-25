import Chart, { ChartType, DataElement } from './chart';

let count = 200;
let chartType: ChartType = ChartType.Preview;
const data: DataElement[] = [];

function randomData(index: number) {
  const r = Math.floor(Math.random() * 95);
  const c = r > 70 ? 'failed' : 'completed';
  const r2 = Math.floor(Math.random() * (100 - r));
  return {
    key: String(index),
    props: {
      className: c,
    },
    children: [
      {
        key: `${index}-1`,
        props: {
          className: 'completed',
          style: {
            height: `${r * 3}px`,
          },
        },
      },
      {
        key: `${index}-2`,
        props: {
          className: c,
          style: {
            height: `${r2 * 3}px`,
          },
        },
      },
    ],
  };
}

for (let i = 0; i < count; i++) {
  data.push(randomData(i));
}

const chart = new Chart(document.getElementById('chart')!, {
  rootClassName: 'root',
});

chart.render({
  type: chartType,
  data,
});

setInterval(function() {
  data.shift();
  count++;
  data.push(randomData(count));
  chart.render({
    type: chartType,
    data,
  });
}, 2000);

document.getElementById('label')!.addEventListener('click', () => {
  if (chartType === ChartType.Preview) {
    chartType = ChartType.Detail;
  } else {
    chartType = ChartType.Preview;
  }
  chart.render({
    type: chartType,
    data,
  });
});
