'use strict';

var https = require('https'),
	fetch = require('node-fetch'),
	{ keys, boards, versions } = require('./consts');

class Sync {
	constructor(data){
		this.data = data;
		this.keepalive = new https.Agent({ keepAlive: true });
	}
	url(board, code, key){
		return 'https://dl.google.com/dl/edgedl/chromeos/recovery/chromeos_' + code + '_' + board + '_recovery_stable-channel_mp' + (key ? '-v' + key : '') + '.bin.zip';
	}
	async run(){
		await this.data.store;
		
		// reuse keys
		let sort_by_hits = keys,
			key_hits = {};
		
		for(let board of boards){
			for(let [ release, version ] of Object.entries(versions)){
				if(!this.data.store[board])this.data.store[board] = {
					processed: {},
					releases: {},
				};
				
				let sboard = this.data.store[board];
				
				for(let code of [].concat(version)){
					if(!sboard.processed[code])sboard.processed[code] = [];
					
					for(let key of sort_by_hits){
						if(sboard.processed[code].includes(key))continue;
						
						let url = this.url(board, code, key);
						
						let res;
						
						try{
							res = await fetch(url, {
								method: 'HEAD',
								agent: this.keepalive,
							});
						}catch(err){
							console.error(err);
							
							sboard.processed[code].push(key);
							this.data.change();
							
							return;
						}
						
						if(res.status == 200){
							console.log(board, release, url);
							
							key_hits[key] = (key_hits[key] || 0) + 1;
							sboard.releases[release] = { key, code };
							sort_by_hits = keys.sort((key1, key2) => (key_hits[key2] || 1) - (key_hits[key1] || 1));
							this.data.change();
						}
						
						sboard.processed[code].push(key);
						this.data.change();
					}
				}
			}
		}
	}
}

module.exports = Sync;