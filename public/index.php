<!DOCTYPE HTML>
<html>
	<head>
		<meta charset='utf-8'>
		<title>Chrome100</title>
		<link rel='stylesheet' href='index.css' />
		<link rel='apple-touch-icon' sizes='180x180' href='apple-touch-icon.png' />
		<link rel='icon' type='image/png' sizes='32x32' href='favicon-32x32.png'><link rel='icon' type='image/png' sizes='16x16' href='favicon-16x16.png' />
		<link rel='manifest' href='manifest.json' />
		<link rel='mask-icon' href='safari-pinned-tab.svg' color='#5bbad5' />
		<meta name='viewport' content='width=device-width, initial-scale=1' />
		<meta name='theme-color' content='#FAFAFA' />
		<meta name='description' content='Chrome100, the one place for many ChromeOS recovery images' />
		<meta name='twitter:card' content='summary_large_image'><meta content='banner.webp' property='og:image' />
	</head>
	<body>
		<p>To burn recovery images, you need the <a href='https://chrome.google.com/webstore/detail/jndclpdbaamdhonoechobihbbiimdgai'>Chromebook Recovery Utility</a></p>
		
		<p>To use a recovery USB, press ESC + REFRESH + POWER then insert your USB.</p>
		
		<p>Source at <a href='https://github.com/sysce/chrome100'>sysce/chrome100</a></p>
		
		<table border='1'>
			<thead>
				<tr>
					<th>Codename</th>
					<th>Recovery</th>
					<th>Brand names</th>
				</tr>
			</thead>
			<tbody><?js
for(var name in data.store.codes){
	var code = data.store.codes[name];

	echo('<tr><td><span>' + nodehttp.sanitize(name) + '</span></td>');

	echo('<td class="codes">');

	for(var ver in data.store.base)if(!code[1].includes(ver))echo('<a class="version" href="firmware?firm=' + name + '&rel=' + ver + '">' + nodehttp.sanitize(ver) + '</a>');
	
	echo('</td><td>' + code[0].map(([ name, release ]) => '<a title="' + nodehttp.sanitize(release) + '">' + nodehttp.sanitize(name) + '</a>').join(', ') + '</td></tr>');
}			?></tbody>
		</table>
	</body>
</html>