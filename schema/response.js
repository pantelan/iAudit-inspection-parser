/**
 * @author TopCoder_FCI
 */

(function() {

	var Authorship = {
			owner : String,
			device_id : String, // ID
			author : String
	};
	var AuditInfo = {
			score : Number,
			date_completed : Number, // Long
			name : String,
			date_modified : Number, // Long
			duration : Number,
			date_started : Number, // Long
			total_score : Number,
			authorship : Authorship
	};
	var Location = {
			iso_country_code : String, // e.g US, EG
			administrative_area : String,
			name : String,
			thoroughfare : String,
			locality : String,
			country : String,
			longitude : Number,
			latitude : Number,
			sub_administrative_area : String,
			postal_code : String,
			sub_locality : String,
			sub_thoroughfare : String,
			formatted_address : [String]
	};
	var Response = {
			colour : String, // comma delimeted RGB values
			short_label : String,
			label : String,
			score : Number,
			id : String, // ID
			enable_score : Boolean,
			text : String,
			datetime : Number	// Long
	};
	var Responses = {
			response : {
				type : Array,
				defaults : []
			},
			location_text : String,
			location : Location
	};
	var MediaItem = {
			date_created : Number, // Long
			file_ext : String, // e.g jpg
			media_id : String, // ID
			filename : String, // e.g <media_id>.<file_ext>
	};
	var Options = {
			weighting : Number,
			response_set : String, // ID
			values : [String], // List of ID's
			condition : String, // ID,
			min : Number,
			max : Number,
			increment : Number
	};
	var AuditItem = {
			combined_score : Number,
			parent_id : String, // ID
			score : Number,
			item_id : String, // ID
			total_score : Number,
			label : String,
			type : String, // Enum
			combined_total_score : Number,
			responses : Responses, // Object contains list of responses
			_options : Options,
			media : {
				type : Array,
				defaults : []
			}
	};
	var Metadata = {
			industry : Number,
			image : String,
			description : String,
			name : String,
			subindustry : Number
	};
	var TemplateData = {
			authorship : Authorship,
			metadata : Metadata
	};
	var Audit = {
			audit_data : AuditInfo,
			item : {
				type : Array,
				defaults : []
			},
			audit_id : String, // ID
			template_data : TemplateData,
			header : {
				type : Array,
				defaults : []
			},
			template_id : String // ID
	};
	
	module.exports = Audit;
})();
