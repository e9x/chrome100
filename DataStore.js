'use strict';

var fs = require('fs');

class DataStore {
	constructor(file, base = {}){
		this.file = file;
		// base data if the specified file cannot be loaded
		this.base = base;
		
		this.timeouts = new Set();
		this.intervals = new Set();
		
		this.setInterval(() => this.save(), 1000);
		
		this.store = this.load();
		
		this.store.then(data => this.store = data);
	}
	change(){
		if(this.closed)throw new Error('DataStore is closed.');
		this.changed = true;
	}
	async load(){
		if(this.closed)throw new Error('DataStore is closed.');
		
		try{
			return JSON.parse(await fs.promises.readFile(this.file));
		}catch(err){
			return this.base;
		}
	}
	async save(){
		if(this.closed)throw new Error('DataStore is closed.');
		
		if(!this.changed)return;
		await fs.promises.writeFile(this.file, JSON.stringify(this.store));
		this.changed = false;
	}
	setTimeout(callback, time){
		if(this.closed)throw new Error('DataStore is closed.');
		var res = setTimeout(callback, time);
		this.timeouts.add(res);
		return res;
	}
	setInterval(callback, time){
		if(this.closed)throw new Error('DataStore is closed.');
		var res = setInterval(callback, time);
		this.intervals.add(res);
		return res;
	}
	close(){
		this.closed = true;
		
		for(let timeout of this.timeouts)clearTimeout(timeout);
		for(let interval of this.intervals)clearInterval(interval);
	}
}

module.exports = DataStore;