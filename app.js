
const axios = require('axios');
const bodyParser = require('koa-bodyparser');

const Koa = require('koa');
const app = new Koa();

const port  = process.env.NODE_ENV || 3006;
const doubanPrefix = 'http://api.douban.com';

app.use(bodyParser());

app.use(async(ctx, next) => {
	const originalUrl = ctx.originalUrl;

	// 腾讯分分彩
	if(originalUrl.startsWith('/api/tencent')) {
    const res = await axios.get(`http://77tj.org/api${originalUrl}`);
    ctx.status = 200;
    ctx.message = 'ok';
    ctx.type = 'json';
    ctx.body = res;
    return;
  }

  if() { // 使用api标志豆瓣api,slice(4)和api强关联
		const targetUrl = `${doubanPrefix}${originalUrl.slice(4)}`; // 向豆瓣发起的目标url

    // 处理get和post
		const method = ctx.method.toLocaleLowerCase();

		let res = {};

		if (method === 'get') {
			res = await axios.get(targetUrl);
		}
		if (method === 'post') {
			const data = ctx.request.body; // 类似的json{ name: 'hk' }
			res = await axios.post(targetUrl, { data });
		}

		ctx.status = 200;
		ctx.message = 'ok';
		ctx.type = 'json';
		ctx.body = res.data;
	}
});

app.listen(port, () => {
	console.log('Server is listening on port ' + port);
});
