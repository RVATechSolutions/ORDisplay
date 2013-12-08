
var patTypes = ['IN', 'OBS', 'SDC', 'TBA'];
var destinations = ['GEM ICU', 'GEM PACU', 'GEM PACU', 'GEM PACU', 'GEM PACU', 'GEM PACU', 'GEM PACU', 'GEM PACU', 'GEM PACU', 'GEM PACU', 'GEM PACU', 'GEM PACU', 'GEM PACU', 'GEM PACU', 'GEM PACU', 'GEM PACU', 'GEM PACU', 'GEM PACU', 'GEM PACU Phase II', 'HOME'];
var names = ['Kaye', 'Hudon', 'Garland', 'Finney', 'Dickerson', 'Vallee', 'Laver', 'Morlock', 'Saleh', 'Steinman', 'Cooper', 'Brady', 'Kale', 'George', 'Simpson', 'Francis', 'Barr', 'Mongold', 'Corker', 'Hooper', 'Murphy', 'Simon', 'Jones', 'Smith', 'Williams', 'Green', 'Plum', 'White', 'Prosser', 'Spineal', 'Compton', 'Camp', 'Winn', 'Anderson', 'Smith', 'Grouch', 'Algon', 'Stevens', 'Davis', 'Brim'];
var procedures = ['Tonsilectomy', 'Hernia Repair', 'Cardiac Ablation', 'Hernia Repair', 'Tonsilectomy', 'Angioplasty', 'Splenectomy', 'Coccygectomy', 'Lumpectomy', 'Panniculectomy', 'Urostomy', 'Sinusotomy', 'Phlebotomy', 'Laparotomy', 'Gonadectomy', 'Gingivectomy', 'Ganglionectomy', 'Rhinectomy', 'Thyroidectomy', 'Prostatectomy'];
var locations = ['Closing 13:58', 'GEM PreOp 3 14:00', 'GEM PreOp 3 14:00', 'GEM PreOP 4 14:03', 'GEM PreOP 4 14:03', 'PACU Phase I 10:44', 'PACU Phase I 10:44', 'PACU Phase I 10:44', 'PACU Phase I 10:44', 'PACU Phase II 09:12', 'PACU Phase II 09:12', 'PACU Phase II 09:12', 'PACU Phase II 09:12'];

function Appointment(){
	var self = this;
	self.Time = arguments[0] || "TIME";
	self.Surgeon= arguments[1] || "";
	self.Patient = arguments[2] || "";
	self.PatType = arguments[3] || "";
	self.Location = arguments[4] || "";
	self.Procedure = arguments[5] || "";
	self.Warnings = arguments[6] || "";
	self.Comments = arguments[7] || "";
	self.Destination = arguments[8] || "";
	self.isDuplicatePatientName = false;
};

function OperatingRoom(){
	var self = this;
	self.Name = arguments[0] || "";
	self.Anes = arguments[1] || "";
	self.CRNA = arguments[2] || "";
	self.RN1 = arguments[3] || "";
	self.RN2 = arguments[4] || "";
	self.Scrub1 = arguments[5] || "";
	self.Scrub2 = arguments[6] || "";
	self.Appointments = new Array();
};

function ViewModel(){
	var self = this;
	self.Rooms = ko.observableArray();
	self.Alert = ko.observable('');
	self.News = ko.observableArray();
};

var vm;
var tick;
$(function(){
	vm = new ViewModel();
	
	//Get Room information
	var data = getRooms();
	for(var i = 0; i < data.length; i++){
		vm.Rooms.push(data[i]);
	}
	
	//Kind of HACK way to identify duplicate patient names for demo
	var patientNames = [];
	for(var i in vm.Rooms()){
		for (var j in vm.Rooms()[i].Appointments){
			if (patientNames[vm.Rooms()[i].Appointments[j].Patient] == undefined)
				patientNames[vm.Rooms()[i].Appointments[j].Patient] = 0;
			patientNames[vm.Rooms()[i].Appointments[j].Patient]++;
		}
	}
	
	for(var i in vm.Rooms()){
		for (var j in vm.Rooms()[i].Appointments){
			if (patientNames[vm.Rooms()[i].Appointments[j].Patient] > 1)
				vm.Rooms()[i].Appointments[j].isDuplicatePatientName = true;
		}
	}
		
	//Get News Items
	var news = getNews();
	vm.News.push('This is an initial news item.');
	for(var i = 0; i < news.length; i++){
		vm.News.push(news[i]);
	}
	vm.News.push('This is a final news item.');
	
	if ((Math.floor(Math.random() * 5)) >= 3)
		vm.Alert('Code ADAM: 7 year old female by the name of Abigail last seen on the second floor of the pediatric oncology wing.  Patient is heavily sedated and may not respond to external stimuli.');
	
	
	ko.applyBindings(vm);
	
	//Set clock functionality
	setInterval(function(){
		$('.time').html(moment().format('HH:mm:ss M/DD/YYYY'));
	}, 1000);
	
	//Initialize the news ticker
	
	$('.ticker').css('width', $(this).width() - $('.time').width()- 60);
	$('.ticker').marquee({
		speed: 10
		})
		.on('finished', function(){
			console.log('received finished event');
			var news = getNews();
			vm.News.removeAll();
			for(var i = 0; i < news.length; i++){
				vm.News.push(news[i]);
			}
		});	
	
});

function getRooms(){
	var obj = new Array();
	for(var i = 0; i < 4; i++){
		var appts = Math.floor(Math.random() * 6);
		var room = createMockRoom(i);
		for(var j = 0; j < appts; j++){
			room.Appointments.push(createMockAppointment(j));
		}
		obj.push(room);
	}
	return obj;
}

function getNews(){
	var news = new Array();
	var items = Math.floor(Math.random() * 10);
	for(var i = 1; i <= items; i++){
		news.push("This is news item #" + i + ".");
	}
	console.log(items);
	return news;
}

function randomElement(array){
	return array[Math.floor(Math.random() * array.length)];
}

function createMockRoom(i){
	var name = "GEM OR " + (i + 1);
	var anes = randomElement(names);
	var crna = randomElement(names);
	var rn1 = randomElement(names);
	var	rn2 = randomElement(names);
	var scrub1 = randomElement(names);
	var scrub2 = randomElement(names);
	return new OperatingRoom(name, anes, crna, rn1, rn2, scrub1, scrub2);
};

function createMockAppointment(num){	
	var time = moment('1/1/2000 8:00 am').add('h', num * 2).format('HH:mm');
	var surgeon= randomElement(names);
	var patient = randomElement(names);
	var patType = randomElement(patTypes);
	var location = randomElement(locations);
	var procedure = randomElement(procedures);
	var i = Math.floor(Math.random() * 8);
	var warnings = "img/star" + i + ".png";
	var comments = "";
	var destination = randomElement(destinations);
	return new Appointment(time, surgeon, patient, patType, location, procedure, warnings, comments, destination);
};