/**
 * @author TopCoder_FCI
 */
(function() {
	var Type		= require('type-of-is')
	;

	var JSONUtils = function(obj) {
		this._obj = obj;
		this._TypeIs = Type.is;
	};
	
	JSONUtils.prototype.get = function() {
		return this._obj;
	};
	
	JSONUtils.prototype.renameAttribute = function(oldName, newName) {
		this._obj = this._renameAttribute(this._obj, oldName, newName);
		
		return this;
	};
	
	JSONUtils.prototype._renameAttribute = function(obj, oldName, newName) {
		var newObj = {};
		var TypeIs = this._TypeIs;
		
		if(!obj || !TypeIs(obj, Object)) {
			return obj;
		}
		
		for (var field in obj) {
			var type = obj[field];
			var targetField = field === oldName? newName : field ;
			
			if(TypeIs(type, Object)) {
				newObj[targetField] = this._renameAttribute(type, oldName, newName);
			} else if(TypeIs(type, Array)) {
				newObj[targetField] = [];
				
				for(var index in type) {
					var newVal = this._renameAttribute(type[index], oldName, newName);
					
					newObj[targetField].push(newVal);
				}
			} else {
				newObj[targetField] = obj[field] ;
			}
		}
		
		return newObj;
	};
	
	module.exports = JSONUtils;
})();
