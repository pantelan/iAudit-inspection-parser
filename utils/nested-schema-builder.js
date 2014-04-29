/**
 * @author TopCoder_FCI
 */
(function() {
	var Type		= require('type-of-is')
	;

	var NestedSchemaBuilder = function(schemas) {
		
		this._cache = {};
		this._schemas = schemas;
	};

	NestedSchemaBuilder.prototype.build = function(mongoose) {
		this._mongoose = mongoose;
		
		var nested = {};
		var schemas = this._schemas;
		var cache = this._cache ;
		
		if (schemas && schemas.hasOwnProperty('__root__')) {
			var root = schemas.__root__;
			
			console.log('__root__ :', root);
			
			for (var schema in schemas ) {
				
				if(schema !== '__root__') {
					this.buildNestedSchema(schema);
				}
			}
			
			nested = cache[root];
		} else {
			throw new Error("Either schema is NULL or schema has no root element '__root__'");
		}

		return nested;
	};

	NestedSchemaBuilder.prototype.buildNestedSchema = function(name) {
		var nested = {};
		var cache = this._cache ;
		var schema = this._schemas[name];
		var mongoose = this._mongoose;
		
		if(cache[name]) {
			// console.log('Schema :' + name + ' already cached.');
			return cache[name];
		}
		
		// console.log('Schema :' + name + ' has no cache.');
		
		for (var field in schema) {
			var type = schema[field];
			
			if(Type.is(type, String)) {
				// console.log('Field :', type, ' Is Nested');
				
				this.buildNestedSchema(type);
				
				nested[field] = {
					type : mongoose.Schema.ObjectId,
					ref : "'" + type + "'"
				};
			} else if(Type.is(type, Array) && Type.is(type[0], String)) {
				type = type[0];
				// console.log('Field :', type, ' Is Nested Array');
				this.buildNestedSchema(type);
				
				nested[field] = [type];
				// console.log('Nested :', nested[field]);
			} else {
				// console.log('Field :', field, ' Is simple');
				nested[field] = type ;
			}
		}
		
		cache[name] = new mongoose.Schema(nested);
		
		return cache[name];
	};
	
	NestedSchemaBuilder.prototype.renameAttribute = function(obj, oldName, newName) {
		var newObj = {};
		
		if(!obj) {
			return obj;
		}
		
		for (var field in obj) {
			var type = obj[field];
			
			if(Type.is(type, Object)) {
				newObj[field] = this.renameAttribute(type, oldName, newName);
			} else {
				newObj[field] = obj[field] ;
			}
		}
		
		return newObj;
	};
	
	module.exports = NestedSchemaBuilder;
})();
