const nodemailer = require('nodemailer');
const date = new Date();

// 发送信息配置
const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
  port: 465, // SMTP 端口
  secureConnection: true, // 使用了 SSL
  auth: {
    user: '2787616995@qq.com',
    // 这里密码不是qq密码，是你设置的smtp授权码
    pass: 'xbkkbksmyosrdfci',
  }
});

module.exports = sendEmail = (subject, luckNumber) => {
  let luckItem = '';
  luckNumber.forEach((e, i) => {
    let isEnd = i === luckNumber.length - 1;
    luckItem += `<b style="color:${isEnd ? 'blue' : 'red'}">${e}${isEnd ? '' : ','}</b>`
  });
  let mailOptions = {
    from: `"${date.toLocaleDateString()}：双色球开奖结果" <2787616995@qq.com>`, // sender address
    to: '874738290@qq.com, maruokun@aliyun.com', // list of receivers
    subject, // Subject line
    // 发送text或者html格式
    html: `<h1>${subject}期开奖结果：${luckItem}</h1>` // html body
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // return console.log(error);
      console.log(error,'errr')
    }
    console.log('Message sent: %s', info.messageId);
    // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
  });
}