'use strict';
'require view';
'require fs';
'require ui';

/*
	Copyright 2023-2024 Rafał Wabik - IceG - From eko.one.pl forum
	
	Licensed to the GNU General Public License v3.0.
*/

return view.extend({
	load: function() {
		return fs.trimmed('/etc/modem/modemlist.json').catch(function(err) {
			ui.addNotification(null, E('p', {}, _('Unable to load data: ' + err.message)));
			return '';
		});
	},

	render: function(data) {
		var dlines = data.trim().split(/\n/).map(function(line) {
		return line.replace(/^<\d+>/, '');
		});

		var info = _('List of found modems. Not all modems may be shown.');

		return E([], [
			E('h2', {}, [ _('Modems found') ]),
			E('div', { class: 'cbi-section-descr' }, info),
			E('div', { 'id': 'content_syslog' }, [
				E('textarea', {
					'id': 'syslog',
					'style':'border: 1px solid var(--border-color-medium); border-radius: 5px; font-family: monospace; font-size:12px; white-space:pre; width: 100%; resize: none;',
					'readonly': true,
					'wrap': 'off',
					'rows': dlines.length + 1
				}, [ dlines.join('\n') ])
			]),

		]);
	},

	handleSaveApply: null,
	handleSave: null,
	handleReset: null
});
