'use strict';

var path = require('path'),
	https = require('https'),
	fastify = require('fastify'),
	Compiler = require('./Compiler'),
	DataStore = require('./DataStore'),
	Sync = require('./Sync'),
	data = new DataStore(path.join(__dirname, 'data.json')),
	sync = new Sync(data),
	compiler = new Compiler(data),
	sync_operation = sync.run(),
	server = fastify({ logger: false });

console.log('Syncing...');

sync_operation.then(() => {
	sync_operation.resolved = true;
	console.log('Sync complete');
	
	compiler.init();
});

server.route({
	url: '/data',
	method: 'GET',
	handler(request, reply){
		if(!sync_operation.resolved)return reply.code(500).send(new Error('Server is undergoing syncing...'));
		
		var out = {};
		
		for(let [ board, { releases } ] of Object.entries(data.store))out[board] = Object.keys(releases);
		
		reply.send(out);
	},
});

server.route({
	url: '/download',
	method: 'GET',
	querystring: {
		board: { type: 'string' },
		release: { type: 'integer' },
	},
	handler(request, reply){
		if(!sync_operation.resolved)return reply.code(500).send(new Error('Server is undergoing syncing...'));
		
		var { board, release } = request.query;
		
		var board_store = data.store[board];
		if(!board_store)throw new RangeError('Unknown board');
		
		var meta = board_store.releases[release];
		if(!meta)throw new RangeError('Unknown release');
		
		var { code, key } = meta;
		
		reply.redirect(`https://dl.google.com/dl/edgedl/chromeos/recovery/chromeos_${code}_${board}_recovery_stable-channel_mp${key ? '-v' + key : ''}.bin.zip`);
	},
});

server.listen(7100, err => {
	if(err)throw err;
	
	console.log('listening on http://127.0.0.1:7100');
});

server.register(require('fastify-static'), { root: compiler.web });