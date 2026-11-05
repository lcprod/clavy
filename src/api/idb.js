const DB_NAME = 'clavy';
const DB_VERSION = 1;
let DB;

export default {

	async getDb() {
		return new Promise((resolve, reject) => {

			if(DB) { return resolve(DB); }

			let request = window.indexedDB.open(DB_NAME, DB_VERSION);
			
			request.onerror = e => {
				console.log('Error opening db', e);
				reject('Error');
			};
	
			request.onsuccess = e => {
				DB = e.target.result;
				resolve(DB);
			};
			
			request.onupgradeneeded = e => {
				//console.log('onupgradeneeded');
				let db = e.target.result;
				let keys = db.createObjectStore('keys', { autoIncrement: true, keyPath:'id' });
				db.createObjectStore('games', { autoIncrement: true, keyPath:'id' });
				keys.createIndex('id_game', 'id_game');

			};
		});
	},
	async deleteData(data, tbl) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction([tbl],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore(tbl);
			if (data == null){
				store.clear();
			}else{
				store.delete(data.id);
			}
		});	
	},
	async getDatas(tbl) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction([tbl],'readonly');
			trans.oncomplete = () => {
				resolve(results);
			};
			
			let store = trans.objectStore(tbl);
			let results = [];

			store.openCursor().onsuccess = e => {
				let cursor = e.target.result;
				if (cursor) {
					results.push(cursor.value)
					cursor.continue();
				}else {
					resolve(results); 
				}
			};

		});
	},

	async getDatasWithFilter(tbl, filterField, filterValue) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction([tbl],'readonly');
			trans.oncomplete = () => {
				resolve(results);
			};
			
			let store = trans.objectStore(tbl);
			let results = [];

			let index = store.index('id_game'); 
			index.openCursor(IDBKeyRange.only(filterValue)).onsuccess = e => {
				let cursor = e.target.result;
				if (cursor) {
					results.push(cursor.value);
					cursor.continue();
				} else {
					resolve(results); 
				}
			};

		});
	},

	async saveData(data, tbl) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction([tbl],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore(tbl);
			store.put(data);

		});
	
	},

	async exportToJson() {

		const keysData = await this.getDatas('keys');
		const gamesData = await this.getDatas('games');

		const bdds = {
			keys: keysData,
			games: gamesData
		};

		const data = JSON.stringify(bdds, null, 2);

		var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')

        a.download = "clav.json"
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)

	},
	
	async loadFromJson(file){
		return new Promise(resolve => {
            const reader = new FileReader();

            reader.onload = (event) => {

				const jsonData = JSON.parse(event.target.result);
				
				this.deleteData(null, 'keys');
				this.deleteData(null, 'games');

				jsonData.keys.forEach(key => this.saveData(key, 'keys'));
				jsonData.games.forEach(game => this.saveData(game, 'games'));

				resolve();

            };

            reader.readAsText(file);
        });

	}

}