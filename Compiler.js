'use strict';

var fs = require('fs'),
	path = require('path'),
	prism = require('prismjs'),
	webpack = require('webpack'),
	prism_load = require('prismjs/components/'),
	marked = require('marked'),
	ExtractCSS = require('mini-css-extract-plugin'),
	HTML = require('html-webpack-plugin');

prism_load([ 'javascript', 'markup', 'css', 'json' ]);

marked.setOptions({
	highlight(code, lang){
		return prism.languages[lang] ? prism.highlight(code, prism.languages[lang], lang) : code;
	},
});

class Compiler {
	assets = path.join(__dirname, 'assets');
	web = path.join(__dirname, 'public');
	md = path.join(this.assets, 'index.md');
	remove = /(<!-- REMOVE -->)[\s\S]*?\1/g;
	public_folder = /public\//g;
	constructor(data){
		this.data = data;
	}
	markdown(code){
		return `<div class='markdown-body'>${marked(code.toString().replace(this.public_folder, '').replace(this.remove, ''))}</div>`;
	}
	init(){
		this.webpack = webpack({
			entry: path.join(this.assets, 'index.js'),
			output: {
				path: this.web,
				filename: 'main.js',
			},
			plugins: [
				new HTML({
					template: path.join(this.assets, 'index.ejs'),
					templateParameters: {
						compiler: this,
						fs,
					},
				}),
				new ExtractCSS()
			],
			module: {
				rules: [
					{
						test: /\.css$/,
						use: [
							ExtractCSS.loader,
							'css-loader',
						],
					},
					{
						test: /\.md$/i,
						type: 'json',
						parser: {
							parse: markdown => this.markdown(markdown),
						},

					},
					{
						test: /\.(svg|gif|png|eot|woff|ttf)$/,
						use: [
							'url-loader',
						],
					},
				],
			},
		}, (err, stats) => {
			if(this.errors(err, stats))return console.error('Compiler failure');
			
			this.webpack.watch({}, async (err, stats) => {
				if(this.errors(err, stats))return console.error('Build failure');
				else console.log('Build success');
			});
		});
	}
	errors(err, stats = { compilation: { errors: [] } }){
		var error = !!(err || stats.compilation.errors.length);
		
		for(var ind = 0; ind < stats.compilation.errors.length; ind++)error = true, console.error(stats.compilation.errors[ind]);
		
		if(err)console.error(err);
		
		return error;
	}
	padding(str){
		return ' ' + str + ' ';
	}
	recovery_table(){
		var cats = [ 'Board', 'Models', 'Releases' ],
			extend = [];
		
		extend.push(`|${cats.map(this.padding).join('|')}|`);
		extend.push(`|${cats.map(x => ' ---- ').join('|')}|`);
		
		for(let [ board, { releases } ] of Object.entries(this.data.store)){
			let data = [ board, 'N/A' ];
			
			let links = [];
			
			for(let [ release, { key, code } ] of Object.entries(releases)){
				links.push(`[${release}](/download?board=${board}&release=${release})`);
			}
			
			// break list of versions every ${split} values
			
			let out = '',
				split = 5;
			
			for(let index = 0; index < links.length; index += split){
				links.splice(index++ + split, 0, '<br>');
			}
			
			data.push(links.join(' '));
			
			extend.push(`|${data.map(this.padding).join('|')}|`);
		}
		
		return extend.join('\n');
	}
};

module.exports = Compiler;