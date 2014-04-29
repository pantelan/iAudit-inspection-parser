/**
 * @author TopCoder_FCI
 */
(function() {
	var Type	= require('type-of-is');
	
	module.exports = {
		convertSecToMilli : function(object) {
			var modified = object || {};
			
			if(object) {
				
				for(var attr in object ) {
					var type = object[attr];
					
					if(type) {
						if(type == Date) {
							modified[attr] = {
								type : Date,
								get : function(val) {
									return val * 1000;
								}
							};
						} else if(Type.is(type, Object)) {
							modified[attr] = this.convertSecToMilli(type);
						} else {
							modified[attr] = type;
						}
					}
				}
			}
			
			return modified;
		}
	};
})();
