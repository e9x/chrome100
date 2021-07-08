// ==UserScript==
// @name         CrOS Updates Scraper
// @namespace    https://sys32.dev/
// @version      1.0
// @match        https://cros-updates-serving.appspot.com/
// @run-at       document-start
// ==/UserScript==

var exports = {};

// from consts.js
exports.keys = [ 0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 19, 23, 25 ];

exports.boards = ["hatch","x86-mario","lumpy","stumpy","daisy","parrot","stout","link","butterfly","peppy","spring","wolf","leon","panther","pit","monroe","skate","clapper","squawks","glimmer","enguarde","expresso","zako","mccloud","quawks","gnawty","kip","swanky","big","tricky","winky","blaze","paine","candy","samus","banjo","jaq","mighty","yuna","jerry","speedy","rikku","tidus","minnie","kitty","guado","lulu","ninja","sumo","orco","gandof","mickey","heli","cyan","celes","terra","ultima","edgar","buddy","chell","sentry","lars","setzer","reks","relm","wizpig","banon","elm","cave","kefka","asuka","kevin","tiger","fievel","hana","pyro","snappy","caroline","reef","bob","sand","eve","coral","fizz","soraka","nautilus","vayne","pantheon","nami","nocturne","grunt","bobba","bobba360","octopus","liara","rammus","scarlet","leona","sarien","shyvana","kukui","jacuzzi"];

exports.versions = {
	32:"4920.83.0",
	33:"5116.88.0",
	34:"5500.130.0",
	35:"5712.88.0",
	36:["5841.83.0", "5841.90.0"],
	48:"7647.84.0",
	51:"8172.62.0",
	52:"8350.68.0",
	53:"8530.81.0",
	56:"9000.91.0",
	57:"9202.64.0",
	58:"9334.72.0",
	59:"9460.60.0",
	60:"9592.96.0",
	61:"9765.85.0",
	62:"9901.77.0",
	65:"10323.62.0",
	66:"10452.99.0",
	67:"10575.58.0",
	68:"10895.56.0",
	69:"10895.78.0",
	70:"11021.81.0",
	71:"11151.113.0",
	72:"11316.165.0",
	73:"11647.104.0",
	74:"11895.118.0",
	75:"12105.100.0",
	76:"12239.67.0",
	77:"12371.75.0",
	78:"12499.66.0",
	79:"12607.82.0",
	80:"12739.111.0",
	81:"12871.102.0",
	83:"13020.87.0",
	84:"13099.110.0",
	85:"13310.93.0",
	86:"13421.99.0",
	87:"13505.73.0",
	88:"13597.105.0",
	89:"13729.56.0"
};

for(let [ release, version ] of Object.entries(exports.versions))exports.versions[release] = [].concat(version);

for(let node of document.querySelectorAll('a')){
	let release = parseInt(node.textContent);
	
	if(isNaN(release))continue;
	
	let [ match, version, board, firmware ] = node.href.match(/chromeos_([\d.]+)_(\w+)_recovery_stable-channel_mp(?:-v(\d+))?\.bin\.zip$/) || [];
	
	if(!match)continue;
	
	firmware = parseInt(firmware);
	
	if(!isNaN(firmware)){
		if(!exports.keys.includes(firmware))exports.keys.push(firmware);
	}
	
	if(!exports.boards.includes(board))exports.boards.push(board);
	
	if(exports.versions[release]){
		if(exports.versions[release].includes(version))continue;
		
		exports.versions[release].push(version);
	}else exports.versions[release] = [ version ];
}

console.log(JSON.stringify(exports));