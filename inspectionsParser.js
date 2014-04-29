/**
 * @author TopCoder_FCI
 */
var mongoose			= require('mongoose'),
	fs					= require('fs'),
	AppConfig			= require('./config/app.js'),
	DataDir				= AppConfig.data_dir,
	SchemaDir			= AppConfig.schema_dir,
	schemas				= require(SchemaDir + 'response.js'),
	NestedSchemaBuilder	= require('./utils/nested-schema-builder.js'),
	JSONUtils			= require('./utils/JSONUtils.js')
	;
	
	require('./utils/string_util.js');

var files = fs.readdirSync(DataDir), auditFiles = [];

for(var i in files) {
	if(!files.hasOwnProperty(i)) {
		continue;
	}
	
	var file = DataDir + '/' + files[i];
	
	if(!fs.statSync(file).isDirectory() && file.endsWith('.json')) {
		auditFiles.push(file);
	}
}

var parseAndSaveFile = function(file, AuditModel) {
	var data = JSON.parse(fs.readFileSync(file, 'utf8'));
	data = new JSONUtils(data).renameAttribute('options', '_options').get();
	
	var auditModel = new AuditModel(data);
	
	var items = auditModel.item;
	
	for(var i = 0, len = items.length; i < len ; i++) {
		var item = items[i];
		
		if(item['media']) {
			var mediaArray = item.media;
			
			for(var j in mediaArray) {
				var media = mediaArray[j];
				
				var filePath = DataDir + media.filename;
			
				try{
					media.data = fs.readFileSync(filePath);
				}catch(err) {
					console.error(err);
				}
			}
			
			auditModel.markModified('item');
		}
	}
	//*
	auditModel.save(function(err, model) {
		if(err) {
			return console.error(err);
		}
		
		console.log("File '" + file + "' was saved successfully!");
		//console.dir(model);
	});
	
	//console.log('Audit :', auditModel.audit_data);
};
//*

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
	
	// console.log('Schema :', schemas);
	//*
	var AuditSchema = new mongoose.Schema(schemas);
	
	//console.log('Schema :', AuditSchema);
	//*
	var AuditModel = mongoose.model('Audit', AuditSchema);
	
	for(var i in auditFiles) {
		var file = auditFiles[i];
		
		parseAndSaveFile(file, AuditModel);
	}
});

mongoose.connect('mongodb://localhost/inspections');
