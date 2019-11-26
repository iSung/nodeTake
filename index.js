const express = require('express');
const app = new express();
const schedule = require('node-schedule');
const superagent = require('superagent');
const cheerio = require('cheerio');
// const rule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [2, 4, 7];
// rule.hour = 21;
// rule.minute = 30;

// const getList = schedule.scheduleJob(rule, function(){
//   request('')
// });

const getHostLuck = (data, num) => {
  let luckList = [];
  let $ = cheerio.load(data.text);
  let dateObj = {};
  let numberObj = {};

  // 找到目标数据所在的页面元素，获取数据
  $('.table tbody tr td:nth-child(2)').each((idx, ele) => {
    dateObj[idx] = $(ele).text();
  });

  $('.table tbody tr td:nth-child(3)').each((idx, ele) => {
    let text = $(ele).text().replace(/\ +/g, '');
    text = text.replace(/[\r\n]/g, ',').replace(/^,+/,"").replace(/,+$/,"");
    numberObj[idx] = text.split(',');
  });

  for (let i = 0; i < num; i++) {
    let currnt = {
      date: dateObj[i],
      lotteryNumber: numberObj[i]
    };
    luckList.push(currnt);
  }
  return luckList;
}

app.get('/getLuckList', (req, res) => {
  const num = req.query.num || 30;
  const baseUrl = `https://kjh.55128.cn/ssq-history-${num}.htm`
  superagent.get(baseUrl).end((err, data) => {
    if (err) {
      // 如果访问失败或者出错，会这行这里
      res.send('获取数据失败');
    } else {
      res.send(getHostLuck(data, num));
    }
  });
});

app.listen(3000, () => { 
  console.log('App listening on port 3000!');
});