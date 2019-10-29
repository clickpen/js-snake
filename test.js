let domObj = {};
domObj.child = [];
let $domArr = $('.category-nav-detail-wrapper').getElementsByClassName('category-nav-detail');
for(let i = 0, len = $domArr.length; i < len; i++) {
	let _doms = $domArr[i].getElementsByClassName('detail-area');
	let _tempArr = [];
	for(let j = 0, leng = _doms.length; j < leng; j++) {
		let _obj = {};
		let _dom_tit = _doms[j].getElementsByTagName('h2')[0].getElementsByTagName('a')[0];
		_obj.name = _dom_tit.innerHTML;
		_obj.link = _dom_tit.href;
		_obj.list = [];
		let _dom_end_arr = _doms[j].getElementsByClassName('detail-content')[0].getElementsByTagName('a');
		for(let k = 0, le = _dom_end_arr.length; k < le; k++) {
			let $domEnd = _dom_end_arr[k];
			_obj.list.push({name: $domEnd.innerHTML, link: $domEnd.href});
		}
		_tempArr.push(_obj);
	}
	domObj.child.push({list: _tempArr});
}
