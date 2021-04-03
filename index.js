'use strict';
var fs = require('fs'),
	path = require('path'),
	http = require('http'),
	https = require('https'),
	nodehttp = require('sys-nodehttp'),
	data = {
		store: {},
		file: path.join(__dirname, 'data.json'),
		load(){
			this.store = fs.existsSync(this.file) ? JSON.parse(fs.readFileSync(this.file, 'utf8')) : {};
		},
		save(){
			fs.promises.writeFile(this.file, JSON.stringify(this.store));
		},
	},
	c100 = {
		base: new URL('https://dl.google.com/dl/edgedl/chromeos/recovery/'),
		firm_regex: /[^_]+(_recovery_stable)/gi,
		git_build: /^\d+/,
	},
	server = new nodehttp.server({
		port: 6290,
		address: '0.0.0.0',
		log_ready: true,
	});

server.get('/boards', (req, res) => {
	res.status(200);
	res.contentType('application/json');
	
	return res.send({
		boards: data.store.boards,
		base: data.store.base,
		failed: data.store.failed,
	});
});

server.get('/firmware', (req, res) => {
	if(typeof req.query.firm != 'string')return res.error(400, 'bad firmware');
	
	var base = data.store.base[req.query.rel],
		code = (data.store.codes[req.query.firm] || (data.store.codes[req.query.firm] = [['Unknown model'],[],{}]));
	
	// code: [ models, failed, cache ]
	
	if(!base || !req.query.firm)return res.error(400, 'bad query');
	
	if(code[1].includes(req.query.rel))return res.error(400, 'code will fail');
	
	if(code[2][req.query.rel])return res.redirect(c100.base + code[2][req.query.rel]);
	
	base = base.replace(c100.firm_regex, req.query.firm + '$1');
	
	// get only 1 that works
	Promise.any(data.store.mp.map(mp => new Promise((resolve, reject, url) => https.request({
		method: 'HEAD',
		hostname: c100.base.hostname,
		path: c100.base.pathname + (url = base.replace('mp.bin.zip', mp + '.bin.zip')),
	}, resp => resp.statusCode == 200 ? resolve(url) : reject(url)).end()))).then(url => {
		res.redirect(c100.base + url);
		
		// add to cache
		code[2][req.query.rel] = new URL(url).split('/').slice(-1)[0];
		
		data.save();
	}).catch(err => {
		res.status(400).send('no version available');
		
		// add to failed
		code[1].push(req.query.rel);
		
		data.save();
	});
});

data.load();

server.use(nodehttp.static(path.join(__dirname, 'public'), {
	global: {
		data: data,
	},
}));

/*c100.git_data = path => new Promise((resolve, reject) => https.request({
	host: 'chromium.googlesource.com',
	path: path + '?format=JSON',
}, (res, chunks = []) => res.on('data', chunk => chunks.push(chunk)).on('end', (body = Buffer.concat(chunks)) => resolve(JSON.parse(body.toString('utf8').split('\n').splice(1).join('\n'))))).on('error', reject).end());
// first line is ")]}'"

Promise.all([
	// modern up-to-date versions
	'/chromiumos/manifest-versions/+/master/full/buildspecs/', // 69-90
	/*'chromiumos/manifest-versions/+/master/incremental/buildspecs/', // 69-90
	'/chromiumos/manifest-versions/+/master/paladin/buildspecs/', // 0.15-0.16, 16-80
	'/chromiumos/manifest-versions/+/master/toolchain/buildspecs/', // 55-85* /
].map(spec => new Promise((resolve, reject) => c100.git_data(spec).then(data => {
	Promise.all(data.entries.filter(x => x.type == 'tree').map(entry => new Promise((resolve, reject) => c100.git_data(spec + entry.name).then(data =>resolve([ entry.name, data ]))))).then(data => {
		var overall = [];
		
		data.forEach(data => {
			/*data[1].entries.filter(x => x.type == 'blob').forEach(entry => {
				var name = (entry.name.match(c100.git_build) || [])[0];
				
				if(!overall.includes(name) && name)overall.push([ data[0], name ]);
			});* /
			
			var entry = data[1].entries.splice(-1)[0],
				name = (entry.name.match(c100.git_build) || [])[0];
			
			if(!overall.includes(name) && name)overall.push([ data[0], name ]);
		});
		
		resolve(overall);
	});
})))).then(releases => {
	console.log(releases);
});*/