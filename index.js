
'use strict';

(function ( glob ) {
	
	/**
	 * generate a random string by base
	 *
	 * @param: { String } - [option] base for uid
	 * @returns: { String }
	 */
	function uid ( base ) {
		// check data type
		base = typeof base == 'string' ? base : (!uid.DEBUG ? 'XXXXXXX-XXXX-XXXX-XXXX-XXXXXXX' :
			( (function(){ throw new Error('Wrong data type of base for uid generate: '+base); })()));
		// generate from base
		return base.replace(/[X|S|N]/g, function ( s ) {
			return (
				s == 'X' ? Math.random()*31|0 :
				s == 'N' ? Math.random()*10|0 : 
				/*s == 'S'*/Math.random()*31|10
			).toString(32);
		});
	};

	/**
	 * EXPORTS
	 *
	 * @public
	 */
	if ( typeof module == 'object' && typeof module.exports == 'object' ) {
		module.exports = uid;
	} else {
		glob.uid = uid;
	}

})(this);