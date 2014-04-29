/**
 * @author TopCoder_FCI
 */
(function() {
	if (typeof String.prototype.startsWith != 'function') {
	    String.prototype.startsWith = function(prefix) {
	        return this.slice(0, prefix.length) == prefix;
	    };
	}
	 
	if (typeof String.prototype.endsWith != 'function') {
	    String.prototype.endsWith = function(suffix) {
	        return this.slice(-suffix.length) == suffix;
	    };
	}
})();
