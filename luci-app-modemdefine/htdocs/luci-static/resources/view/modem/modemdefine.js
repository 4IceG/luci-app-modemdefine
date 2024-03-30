'use strict';
'require form';
'require fs';
'require view';
'require uci';
'require ui';
'require tools.widgets as widgets'

/*
	Copyright 2023-2024 Rafał Wabik - IceG - From eko.one.pl forum
	
	Licensed to the GNU General Public License v3.0.
*/


function usrdesc(section_id) {
	return E('span', (uci.get('modemdefine', section_id, 'user_desc') || ''));
}

function getmodem(section_id) {
	return E('span', (uci.get('modemdefine', section_id, 'modem') || ''));
}

function getport(section_id) {
	return E('span', '<code>' + (uci.get('modemdefine', section_id, 'comm_port') + '</code>' || '<code>' + '' + '</code>' ));
}

return view.extend({

	load: function() {
		return Promise.all([
			L.resolveDefault(fs.list('/dev'), null),
			L.resolveDefault(fs.read_direct('/sys/kernel/debug/usb/devices', [ '-r' ]))
		]);
	},

	render: function(data) {
	
		fs.write('/etc/modem/modemlist.json', '');

		var dlines = data[1].trim().split(/\n/).map(function(line) {
		return line.replace(/^<\d+>/, '');
		});

		var devslist = dlines.join('\n');
		const alldevs = devslist.split('\n\n');
		const results = [];

		for (const modem of alldevs) {
  				const lines = modem.split('\n');
  				let vendor = '';
  				let pid = '';
  				let manufacturer = '';
  				let product = '';
				let serialnumber = '';
  				let driver = '';
				let bus = '';

  			for (const line of lines) {
    				if (line.includes('Driver=hub') || line.includes('Driver=usb-storage') || line.includes('Driver=usblp') ) {
      				driver = line.split('Driver=')[1].trim();
      				break;
    				}
    				
    				if (line.includes('Spd=')) {
      					const match = line.match(/Spd=([^ ]+)/);
      					if (match && match[1]) {
        					bus = match[1].trim();
      					}
    				}
    
    				if (line.includes('Vendor=')) {
      					const match = line.match(/Vendor=([^ ]+)/);
      					if (match && match[1]) {
        					vendor = match[1].trim();
      					}
    				}
    
    				if (line.includes('ProdID=')) {
      					const match = line.match(/ProdID=([^ ]+)/);
      					if (match && match[1]) {
        					pid = match[1].trim();
      					}
    				}

    				if (line.includes('Manufacturer=')) {
      					const match = line.match(/Manufacturer=(.*)/);
      					if (match && match[1]) {
        					manufacturer = match[1].trim();
      					}
    				}

    				if (line.includes('Product=')) {
      					const match = line.match(/Product=(.*)/);
      					if (match && match[1]) {
        					product = match[1].trim();
      					}
    				}

    				if (line.includes('SerialNumber=')) {
      					const match = line.match(/SerialNumber=(.*)/);
      					if (match && match[1]) {
        					serialnumber = match[1].trim();
      					}
    				}
  			}

  		if (driver === '' && (manufacturer !== '' || product !== '')) {
    				const result = {
      						Manufacturer: manufacturer,
      						Product: product,
      						Vendor: vendor, 
      						ProdID: pid,
      						Bus_speed: bus,
						Serial_Number: serialnumber
    					};
    				results.push(result);
  			}
		}

		const outputJSON = JSON.stringify(results, null, 2);
		var countm = Object.keys(results).length;
		fs.write('/etc/modem/modemlist.json', JSON.stringify(results, null, 2) + '\n');

		var m, s, o, snr;
		m = new form.Map('modemdefine', _('Defined modems'), _('Interface to define the available modems. The list of modems will make it easier for the user to switch between modems in other LuCI applications.'));

		s = m.section(form.TypedSection, 'general', _(''));
		s.anonymous = true;
		s.addremove = false;

		s = m.section(form.GridSection, 'modemdefine', _('Modem(s)'));
		s.anonymous = true;
		s.addremove = true;
		s.sortable  = true;
		s.nodescriptions = true;
		s.addbtntitle = _('Add new modem settings...');

		s.tab('general', _('Modem Settings'));

		o = s.taboption('general', form.Value, 'modem', _('Manufacturer / Product'));

		for (var i = 0; i < countm; i++) 
		{
			o.value(results[i].Manufacturer + ' ' + results[i].Product);

		}
		o.placeholder = _('Please select a modem');
		o.textvalue = getmodem.bind(o);
		o.rmempty = false;

		o = s.taboption('general', form.Value, 'comm_port', _('Port for communication'));
		data[0].sort((a, b) => a.name > b.name);
		data[0].forEach(dev => {
			if (dev.name.match(/^ttyUSB/) || dev.name.match(/^cdc-wdm/) || dev.name.match(/^ttyACM/) || dev.name.match(/^mhi_/)) {
				
				o.value('/dev/' + dev.name);
			}
		});
		o.placeholder = _('Please select a port');
		o.textvalue = getport.bind(o);
		o.rmempty = false;
		
		o = s.taboption('general', widgets.NetworkSelect, 'network', _('Interface'),
		_('Network interface for Internet access.')
		);
		o.exclude = s.section;
		o.nocreate = true;
		o.rmempty = false;
		o.default = 'wan';

		o = s.taboption('general', form.Value, 'user_desc', _('User description'));
		o.modalonly = true;
		o.placeholder = _('Optional');

		o = s.taboption('general', form.Value, 'user_desc', _('User description (optional)'));
		o.rawhtml = true;

		o.remove = function() {};
		o.modalonly = false;
		o.textvalue = usrdesc.bind(o);

		return m.render();
	}
});
