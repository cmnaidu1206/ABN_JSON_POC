var OBJECT = function () {
	var obj = {
		COPY: function (destObj, srcObj) {
			for (var k in srcObj) {
				destObj[k] = srcObj[k];
			};
		}
	};
	return obj;
}
