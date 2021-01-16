// 本JS文件中被注释掉的方法也是可行的，是不利用ajax中jsonp功能的方法
// 本地里的api是自己找的，github上的是视频给的
;(function(doc) {
	var searchInput = doc.getElementsByClassName('J_searchInput')[0],
      wdList = doc.getElementsByClassName('J_wdList')[0],
      listWrap = wdList.parentNode,
      firstScript = doc.getElementsByTagName('script')[0],
      listTpl = doc.getElementById('J_listTpl').innerHTML;

	var init = function() {
		bindEvent();
	}

	function bindEvent() {
		searchInput.addEventListener('input', typeInput, false);
	}

	function renderList(data) {
		var list = '',
				data = data.g,
				val = _trimSpace(searchInput.value);

		if(data) {
			data.forEach(function(elem, idx) {
				// 利用idx保证只显示前四个联想结果
				if(idx <= 3) {
					list += listTpl.replace(/{{(.*?)}}/g, function(node, key) {
						return {
							wdLink: elem.q,
							wd: _setWdStyle(val, elem.q)
						}[key];
					});
				}
			});
			wdList.innerHTML = list;
			listWrap.style.display = 'block';
		}else {
			wdList.innerHTML = '';
			listWrap.style.display = 'none';
		}
	}

	function typeInput() {
		var val = _trimSpace(this.value),
				len = val.length;

		if(len > 0) {
			getDatas(val, 'setDatas');
		}else {
			wdList.innerHTML = '';
      listWrap.style.display = 'none';
		}
	}

	function getDatas(value, callbackName) {
		// var oScript = doc.createElement('script');
		// oScript.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+ value +'&cb=' + callbackName;
		// doc.body.appendChild(oScript);
		// doc.body.removeChild(oScript);
		$.ajax({
			url: 'https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1427,21087,29567,29699,29220,26350&wd='+ value,
			type: 'GET',
			dataType: 'JSONP',
			jsonp: 'cb',
			success: function(data) {
				renderList(data);
			}
		});
	}

	function _trimSpace(str) {
		return str.replace(/\s+/g, '');
	}

	function _setWdStyle(value, word) {
		return '<span class="font-normal">' + value + '</span>' + word.replace(value, '');
	}

	// window.setDatas = function(data) {
	// 	renderList(data);
	// }

	init();
})(document);